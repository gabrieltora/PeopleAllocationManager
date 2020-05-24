using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PeopleAllocationManager.Models
{
    public partial class PeopleAllocationManagerContext : DbContext
    {

        public PeopleAllocationManagerContext(DbContextOptions<PeopleAllocationManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<DailyActivity> DailyActivity { get; set; }
        public virtual DbSet<Deal> Deal { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeProject> EmployeeProject { get; set; }
        public virtual DbSet<EmployeeTechnology> EmployeeTechnology { get; set; }
        public virtual DbSet<Function> Function { get; set; }
        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<Provider> Provider { get; set; }
        public virtual DbSet<Request> Request { get; set; }
        public virtual DbSet<Seniority> Seniority { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<Technology> Technology { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                //entity.HasOne<Department>(d => d.Department).WithMany(e => e.Employees).HasForeignKey(d => d.DepartmentId);

                //entity.HasOne<UserRole>(ur => ur.UserRole).WithMany(e => e.Employees).HasForeignKey(ur => ur.UserRoleId);

                //entity.HasOne<Function>(f => f.Function).WithMany(e => e.Employees).HasForeignKey(f => f.FunctionId);

                //entity.HasOne<Seniority>(s => s.Seniority).WithMany(e => e.Employees).HasForeignKey(s => s.SeniorityId);

                entity.HasMany(e => e.EmployeeProject)
                    .WithOne(e => e.Employee)
                    .HasForeignKey(ep => ep.EmployeeId)
                    .IsRequired();
                entity.ToTable(nameof(Employee));

                entity.HasMany(e => e.EmployeeTechnology)
                    .WithOne(e => e.Employee)
                    .HasForeignKey(ep => ep.EmployeeId)
                    .IsRequired();
                entity.ToTable(nameof(Employee));

            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CIF)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.IBAN)
                    .HasMaxLength(34)
                    .IsUnicode(false);

                entity.Property(e => e.Bank)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DailyActivity>(entity =>
            {
                entity.Property(e => e.Comment)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Deal>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Function>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasMany(p => p.EmployeeProject)
                    .WithOne(p => p.Project)
                    .HasForeignKey(ep => ep.ProjectId)
                    .IsRequired();
                entity.ToTable(nameof(Project));
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CIF)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.IBAN)
                    .HasMaxLength(34)
                    .IsUnicode(false);

                entity.Property(e => e.Bank)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Request>(entity =>
            {
                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(1000)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Seniority>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Technology>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasMany(t => t.EmployeeTechnology)
                    .WithOne(t => t.Technology)
                    .HasForeignKey(et => et.TechnologyId)
                    .IsRequired();
                entity.ToTable(nameof(Technology));
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EmployeeTechnology>(entity =>
            {
                entity.HasKey(et => new { et.EmployeeId, et.TechnologyId });
                entity.ToTable(nameof(EmployeeTechnology));
            });


            modelBuilder.Entity<EmployeeProject>(entity =>
            {
                entity.HasKey(ep => new { ep.EmployeeId, ep.ProjectId });
                entity.ToTable(nameof(EmployeeProject));
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
