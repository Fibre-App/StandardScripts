import { Script, IScript, IResult, IRepository, Inject, A, IToasterService } from "@fibre/types";

@Script({
  label: "Pull",
  tooltip: "Pulls changes from the origin",
  ionIcon: "arrowDownOutline"
})
export class Pull implements IScript {
  constructor(@Inject(A.ToasterService) private readonly toasterService: IToasterService) {}

  public async run(repositories: IRepository[]): Promise<IResult> {
    for (const repository of repositories) {
      await repository.pull();
      this.toasterService.success("Pulled!", `Successfully pulled ${repository.name}`);
    }

    return { success: true };
  }
}
