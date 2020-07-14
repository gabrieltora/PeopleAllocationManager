using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class finalLastMigration11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deal_Request_RequestId",
                table: "Deal");

            migrationBuilder.DropIndex(
                name: "IX_Deal_RequestId",
                table: "Deal");

            migrationBuilder.AddColumn<bool>(
                name: "DealRejected",
                table: "Deal",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DealRejected",
                table: "Deal");

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
    }
}
