using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class last2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DealId",
                table: "Request");

            migrationBuilder.CreateIndex(
                name: "IX_Deal_RequestId",
                table: "Deal",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deal_Request_RequestId",
                table: "Deal",
                column: "RequestId",
                principalTable: "Request",
                principalColumn: "RequestId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deal_Request_RequestId",
                table: "Deal");

            migrationBuilder.DropIndex(
                name: "IX_Deal_RequestId",
                table: "Deal");

            migrationBuilder.AddColumn<int>(
                name: "DealId",
                table: "Request",
                type: "int",
                nullable: true);
        }
    }
}
