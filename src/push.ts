import { Script, IScript, IResult, IRepository } from "@fibre/types";

@Script("push")
export class Push implements IScript {

	public async run(repositories: IRepository[]): Promise<IResult> {

		for (const repository of repositories) {
			await repository.push();
		}

		return { success: true };
	}
}
