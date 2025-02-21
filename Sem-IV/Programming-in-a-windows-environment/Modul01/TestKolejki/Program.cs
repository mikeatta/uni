using KolejkaFIFO;

namespace TestKolejki
{
    class Program
    {
        static char Menu()
        {
            Console.Clear();
            Console.WriteLine("\n\t\tA - Dodaj napis do kolejki");
            Console.WriteLine("\n\t\tB - Usuń napis z kolejki");
            Console.WriteLine("\n\t\tC - Podaj liczbę elementów w kolejce");
            Console.WriteLine("\n\t\tD - Wyczyść kolejkę");
            Console.WriteLine("\n\t\tK - Koniec");
            return Console.ReadKey(true).KeyChar;

        }

        static void Main(string[] args)
        {
            Kolejka mojaKolejka= new Kolejka();
            mojaKolejka.Utworz(10);
            string tmp;
            char c;

            do
            {
                c = Menu();
                switch (c)
                {
                    case 'a':
                    case 'A':
                        Console.Write("Podaj napis który ma być dodany do kolejki: ");
                        tmp = Console.ReadLine();
                        mojaKolejka.DodajDoKolejki(tmp);
                        break;
                    case 'b':
                    case 'B':
                        Console.WriteLine("Napis wyjęty z kolejki: {0}",
                            mojaKolejka.UsunZKolejki());
                        Console.ReadKey();
                        break;
                    case 'c':
                    case 'C':
                        Console.WriteLine("Liczba elementów w kolejce wynosi: {0}", 
                            mojaKolejka.PobierzLiczbeElementow());
                        Console.ReadKey();
                        break;
                    case 'd':
                    case 'D':
                        mojaKolejka.Wyczysc();
                        Console.WriteLine("Kolejka wyczyszczona!!!");
                        Console.ReadKey();
                        break;
                }
            }
            while (!(c == 'k' || c == 'K'));
        }
    }
}
