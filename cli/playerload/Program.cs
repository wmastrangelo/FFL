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
            try
            {
                MySqlConnection Connection = new(config.GetConnectionString("conn"));
                Connection.Open();
                var cmd = new MySqlCommand("SHOW TABLES;", Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine(reader.GetString(0));
                }
                Connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
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
        protected void InsertPlayers(List<Player> players)
        {

        }
    }
 
}