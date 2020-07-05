using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class finalMigration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Provider");

            migrationBuilder.AddColumn<bool>(
                name: "IsInActive",
                table: "Provider",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInActive",
                table: "Provider");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Provider",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
