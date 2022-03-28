namespace DatabaseTest.DatabaseTables
{
    public class Config
    {
        public int Id { get; set; }
        public int IdAdministrator { get; set; }
        public string Name { get; set; }
        public string CreateDate { get; set; }
        public string Cron { get; set; }
        public string BackUpFormat { get; set; }
        public string BackUpType { get; set; }
        public int RetentionPackages { get; set; }
        public int RetentionPackageSize { get; set; }
    }
}
