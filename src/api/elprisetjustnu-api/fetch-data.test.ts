import { afterEach, describe, expect, it, vi } from "vitest";
import { responses } from "./__mocks__/responses";
import { fetchData } from "./fetch-data";

const fetchMock = vi.fn();

vi.stubGlobal("fetch", fetchMock);

const createFetchResponse = (data: unknown) => {
  return { json: () => new Promise((resolve) => resolve(data)) };
};

const isSegmentShaped = (data: unknown) => {
  if (typeof data !== "object") return false;
  const { start, points } = data as Record<string, unknown>;
  console.log(start, typeof start);
  return start instanceof Date && Array.isArray(points) && points.length > 0;
};

describe("fetchData", () => {
  afterEach(() => {
    fetchMock.mockClear();
  });

  it("should handle two days of data", async () => {
    fetchMock
      .mockResolvedValueOnce(createFetchResponse(responses[0]))
      .mockResolvedValueOnce(createFetchResponse(responses[1]));

    const response = await fetchData();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(response).toHaveLength(2);
    expect(isSegmentShaped(response[0])).toBeTruthy();
    expect(isSegmentShaped(response[1])).toBeTruthy();
  });

  it("should handle one day of data", async () => {
    fetchMock
      .mockResolvedValueOnce(createFetchResponse(responses[0]))
      .mockResolvedValueOnce(null);

    const response = await fetchData();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(response).toHaveLength(1);
    expect(isSegmentShaped(response[0])).toBeTruthy();
  });

  it("should return empty array for no data", async () => {
    fetchMock.mockResolvedValue(null);

    const response = await fetchData();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(response).toHaveLength(0);
  });
});
