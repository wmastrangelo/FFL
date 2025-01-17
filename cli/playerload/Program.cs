// See https://aka.ms/new-console-template for more information


using Microsoft.VisualBasic.FileIO;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;

namespace playerload
{
    class Load
    {
        static void Main(string[] args)
        {
            IConfiguration config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json").Build();

            List<Player> players = LoadPlayers(args[0]);

            string? conn = config.GetConnectionString("conn");
            if (conn != null)
            {
                InsertPlayers(players, conn);
            }
            else
            {
                Console.WriteLine("conn string from config file failed to load");
            }

        }

        static List<Player> LoadPlayers(string filename)
        {
            List<Player> players = new List<Player>();
            try
            {
                TextFieldParser parser = new(filename);
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                parser.ReadLine();
                while (!parser.EndOfData)
                {
                    string[]? fields = parser.ReadFields();

                    Player player = new()
                    {
                        Rank = int.Parse(fields[0]),
                        Name = fields[1],
                        POS = fields[4],
                        AVG = double.Parse(fields[8])
                    };
                    player.Team = string.IsNullOrEmpty(fields[2]) ? "FA" : fields[2];
                    player.Bye = string.IsNullOrEmpty(fields[3]) ? 0 : int.Parse(fields[3]);
                    player.CBS = string.IsNullOrEmpty(fields[5]) ? 0 : int.Parse(fields[5]);
                    player.Sleeper = string.IsNullOrEmpty(fields[6]) ? 0 : int.Parse(fields[6]);
                    player.RTSports = string.IsNullOrEmpty(fields[7]) ? 0 : int.Parse(fields[7]);
                    players.Add(player);
                }
                parser.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
            return players;
        }
        static void InsertPlayers(List<Player> players, string conn)
        {


            MySqlConnection Connection = new(conn);
            Connection.Open();
            MySqlTransaction tx = Connection.BeginTransaction();


            var cmd = Connection.CreateCommand();
            cmd.Transaction = tx;
            try
            {
                string tablename = "Players - " + DateTime.Today;
                 cmd.CommandText = "CREATE TABLE `" + tablename + "` (" +
                    "`Rank` int DEFAULT NULL," +
                    "`Name` varchar(50) DEFAULT NULL," +
                    "`Team` varchar(5) DEFAULT NULL," +
                    "`Bye` int DEFAULT NULL," +
                    "`POS` varchar(5) DEFAULT NULL," +
                    "`CBS` int DEFAULT NULL," +
                    "`Sleeper` int DEFAULT NULL," +
                    "`RTSports` int DEFAULT NULL," +
                    "`AVG` float DEFAULT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
                    cmd.ExecuteNonQuery();

                players.ForEach(player =>
                {
                    
                    cmd.CommandText = "insert into `"+ tablename +"` set " +
                    "`Rank` = @rank, " +
                    "`Name` = @name, " +
                    "`Team` = @team, " +
                    "`Bye` = @bye, " +
                    "`POS` = @pos, " +
                    "`CBS` = @cbs, " +
                    "`Sleeper` = @sleeper, " +
                    "`RTSports` = @rtsports, " +
                    "`AVG` = @avg;";
                    cmd.Parameters.AddWithValue("@rank", player.Rank);
                    cmd.Parameters.AddWithValue("@name", player.Name);
                    cmd.Parameters.AddWithValue("@team", player.Team);
                    cmd.Parameters.AddWithValue("@bye", player.Bye);
                    cmd.Parameters.AddWithValue("@pos", player.POS);
                    cmd.Parameters.AddWithValue("@cbs", player.CBS);
                    cmd.Parameters.AddWithValue("@sleeper", player.Sleeper);
                    cmd.Parameters.AddWithValue("@rtsports", player.RTSports);
                    cmd.Parameters.AddWithValue("@avg", player.AVG);
                    cmd.ExecuteNonQuery();
                    cmd.Parameters.Clear();
                });
                tx.Commit();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                try
                {
                    tx.Rollback();
                }
                catch (Exception exRollback)
                {
                    Console.WriteLine("Rollback error: " + exRollback);
                }
            }
        }
    }

}