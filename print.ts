import { Script, IScript, IResult, IRepository, IChangeSet } from "@gitsolo/types";

@Script("print")
export class Print implements IScript {
	run(...repositories: IRepository[]): IResult {
		
		for (const repository of repositories) {
			const commits: IChangeSet[] = repository.changesets

			for (const commit of commits) {
				console.log(commit.message);
			}
		}

		return { success: true };
	}
}