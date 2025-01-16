// See https://aka.ms/new-console-template for more information

using System.Data;
using Microsoft.VisualBasic;
using Microsoft.VisualBasic.FileIO;
using MySql.Data;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Tls;
namespace playerload
{
    class Load
    {
        static void Main(string[] args)
        {
            List<Player> players = LoadPlayers(args[0]);
            try
            {
                string connstring = string.Format("Server={0}; database={1}; UID={2}; password={3}", "localhost", "theleagueFFL2025", "", "");
                MySqlConnection Connection = new(connstring);
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
    class Player
    {

        public int Rank { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public int Bye { get; set; }
        public string POS { get; set; }
        public int CBS { get; set; }
        public int Sleeper { get; set; }
        public int RTSports { get; set; }
        public double AVG { get; set; }

        public Player()
        {
            Name = "";
            Team = "";
            POS = "";
            CBS = 0;
            Sleeper = 0;
            RTSports = 0;
        }
        override public string ToString()
        {
            return "Rank: " + Rank + ", Name: " + Name + ", Team: " + Team + " POS: " + POS + " AVG: " + AVG;
        }
    }
}