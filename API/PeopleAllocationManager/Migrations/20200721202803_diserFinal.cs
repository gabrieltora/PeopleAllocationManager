using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class diserFinal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DailyActivity_Invoice_InvoiceId",
                table: "DailyActivity");

            migrationBuilder.DropIndex(
                name: "IX_DailyActivity_InvoiceId",
                table: "DailyActivity");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Request",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DealUrlLink",
                table: "Deal",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Deal",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employee_SeniorityId",
                table: "Employee",
                column: "SeniorityId");

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
                name: "FK_Employee_Seniority_SeniorityId",
                table: "Employee");

            migrationBuilder.DropIndex(
                name: "IX_Employee_SeniorityId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "DealUrlLink",
                table: "Deal");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Deal");

            migrationBuilder.CreateIndex(
                name: "IX_DailyActivity_InvoiceId",
                table: "DailyActivity",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_DailyActivity_Invoice_InvoiceId",
                table: "DailyActivity",
                column: "InvoiceId",
                principalTable: "Invoice",
                principalColumn: "InvoiceId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
