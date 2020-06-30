using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class last1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DealId",
                table: "Request",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RequestId",
                table: "Deal",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DealId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "RequestId",
                table: "Deal");
        }
    }
}
