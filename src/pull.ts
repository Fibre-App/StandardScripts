import { Script, IScript, IResult, IRepository } from "@fibre/types";

@Script("pull")
export class Pull implements IScript {

	public async run(repositories: IRepository[]): Promise<IResult> {

		for (const repository of repositories) {
			await repository.pull();
		}

		return { success: true };
	}
}
