using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class finalMigration111 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Provider_CountryId",
                table: "Provider",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provider_Country_CountryId",
                table: "Provider",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "CountryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provider_Country_CountryId",
                table: "Provider");

            migrationBuilder.DropIndex(
                name: "IX_Provider_CountryId",
                table: "Provider");
        }
    }
}
