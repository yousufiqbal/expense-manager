// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		userId: number,
    email: string,
    currency: string,
    isVerified: boolean
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
