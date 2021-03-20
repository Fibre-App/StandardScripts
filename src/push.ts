import { Script, IScript, IResult, IRepository, IToasterService, Inject, A } from "@fibre/types";

@Script({
  label: "Push",
  tooltip: "Pushes changes to the origin",
  ionIcon: "arrowUpOutline"
})
export class Push implements IScript {
  constructor(@Inject(A.ToasterService) private readonly toasterService: IToasterService) {}

  public async run(repositories: IRepository[]): Promise<IResult> {
    for (const repository of repositories) {
      await repository.push();
      this.toasterService.success("Pushed!", `Successfully pushed ${repository.name}`);
    }

    return { success: true };
  }
}
