// globals.ts
export let globalUserId = -1;

export const setGlobalUserId = (u: number) => {
	globalUserId = u;
};

export let globalUser = '';

export const setGlobalUser = (u: string) => {
	globalUser = u;
};
