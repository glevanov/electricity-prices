<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "standard" | "round";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends HTMLButtonAttributes {
    variant?: Variant;
  }

  export let variant: Variant = "standard";

  const classNames = `${$$props.class ? $$props.class : ""} reset button ${variant}`;
</script>

<button {...$$restProps} class={classNames}>
  <slot />
</button>

<style>
  .reset {
    background-color: unset;
    border: unset;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    padding: unset;
  }

  .button {
    cursor: pointer;

    border: 1px solid var(--button-border);
  }

  .button:hover {
    border-color: var(--button-border-focus);
  }

  .button:active {
    border-color: var(--button-border-active);
  }

  .standard {
    padding: 8px 16px;
    border-radius: 6px;
  }

  .round {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
</style>
