/**
 * A type that extends a given object with a className property
 * @param T - The object to extend
 * @returns The extended object
 */
export type PropsWithClassName<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  className?: string;
};
