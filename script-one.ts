import { Script, IScript, IResult, IRepository, ICommit } from "@gitsolo/types";

@Script("hmm")
export class ScriptOne implements IScript {
	run(...repositories: IRepository[]): IResult {
		
		for (const repository of repositories) {
			const commits: ICommit[] = repository.getCommits();

			for (const commit of commits) {
				console.log(commit.getMessage());
			}
		}

		return { success: true };
	}
}