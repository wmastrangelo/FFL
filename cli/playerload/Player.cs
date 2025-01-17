    public class Player
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
