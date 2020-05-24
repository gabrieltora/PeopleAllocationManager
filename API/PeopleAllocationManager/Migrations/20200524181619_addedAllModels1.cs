using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class addedAllModels1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Request",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Invoice",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoice",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoice_Client_ClientId",
                table: "Invoice",
                column: "ClientId",
                principalTable: "Client",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoice_Client_ClientId",
                table: "Invoice");

            migrationBuilder.DropIndex(
                name: "IX_Invoice_ClientId",
                table: "Invoice");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Invoice");
        }
    }
}
