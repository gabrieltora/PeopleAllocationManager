using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class addedFunctionAndSeniority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FunctionId",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SeniorityId",
                table: "Employee",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Function",
                columns: table => new
                {
                    FunctionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Function", x => x.FunctionId);
                });

            migrationBuilder.CreateTable(
                name: "Seniority",
                columns: table => new
                {
                    SeniorityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seniority", x => x.SeniorityId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_FunctionId",
                table: "Employee",
                column: "FunctionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_SeniorityId",
                table: "Employee",
                column: "SeniorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Function_FunctionId",
                table: "Employee",
                column: "FunctionId",
                principalTable: "Function",
                principalColumn: "FunctionId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Seniority_SeniorityId",
                table: "Employee",
                column: "SeniorityId",
                principalTable: "Seniority",
                principalColumn: "SeniorityId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Function_FunctionId",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Seniority_SeniorityId",
                table: "Employee");

            migrationBuilder.DropTable(
                name: "Function");

            migrationBuilder.DropTable(
                name: "Seniority");

            migrationBuilder.DropIndex(
                name: "IX_Employee_FunctionId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_SeniorityId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "FunctionId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "SeniorityId",
                table: "Employee");
        }
    }
}
