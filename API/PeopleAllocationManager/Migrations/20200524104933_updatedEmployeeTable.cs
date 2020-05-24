using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PeopleAllocationManager.Migrations
{
    public partial class updatedEmployeeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeCode",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "GrossSalary",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HourlyPrice",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsVatPayer",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "NetSalary",
                table: "Employee",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Employee",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "EmployeeCode",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "GrossSalary",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "HourlyPrice",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "IsVatPayer",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "NetSalary",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Employee");
        }
    }
}
