import { afterEach, describe, expect, it, vi } from "vitest";
import { responses } from "./__mocks__/responses";
import { fetchData, fetchUrl, getUrl } from "./fetch-data";

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

describe("getUrl", () => {
  it("should return a valid url", () => {
    expect(getUrl(new Date("2021-01-01"))).toBe(
      "https://www.elprisetjustnu.se/api/v1/prices/2021/01-01_SE4.json",
    );

    expect(getUrl(new Date("2021-12-31"))).toBe(
      "https://www.elprisetjustnu.se/api/v1/prices/2021/12-31_SE4.json",
    );
  });
});

describe("fetchUrl", () => {
  it("should return data on successful request", async () => {
    fetchMock.mockResolvedValue(createFetchResponse(responses[0]));

    const response = await fetchUrl(
      "https://www.elprisetjustnu.se/api/v1/prices/2021/01-01_SE4.json",
    );

    expect(fetchMock).toHaveBeenCalled();
    expect(response).toEqual(responses[0]);
  });

  it("should return null on error", async () => {
    fetchMock.mockRejectedValue(new Error("Network error"));

    const response = await fetchUrl(
      "https://www.elprisetjustnu.se/api/v1/prices/2021/01-01_SE4.json",
    );

    expect(fetchMock).toHaveBeenCalled();
    expect(response).toBeNull();
  });
});
