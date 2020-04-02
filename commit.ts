import { Script, IScript, IResult, IRepository, Inject, A, ILogger, IToasterService } from "d:/Users/tobys/Repositories/University/Fibre/StandardScripts/node_modules/@fibre/types/dist/index";

@Script("commit")
export class commit implements IScript {

	constructor(@Inject(A.Logger) private readonly logger: ILogger,
							@Inject(A.ToasterService) private readonly toaster: IToasterService) { }
	
	public async run(repositories: IRepository[]): Promise<IResult> {

		const message = "This is a commit message";// TODO Needs to come from dialog service
		
		this.logger.info("FROM SCRIPT: ABOUT TO COMMIT!");
		this.toaster.information("TITLE!", "About to commit!")
		for (const repository of repositories) {
			await repository.commit(message);
		}

		return { success: true };
	}
}