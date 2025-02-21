using System;
using Osoby;

namespace TestOsob
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Osoba os1 = new Osoba("Jan", "Kowalski", 1988, Plec.Mezczyzna);
            Console.WriteLine("Utworzyłeś osobę: {0}", os1.ZwrocInformacje());

            Student s1 = new Student("Tomasz", "Nowak", 1989, Plec.Mezczyzna,
                1234);
            Console.WriteLine("Utworzyłeś studenta: {0}", s1.ZwrocInformacje());

            Stypendysta st1 = new Stypendysta("Joanna", "Zielińska", 1987,
                Plec.Kobieta, 1235, 500);
            Console.WriteLine("Utworzyłeś stypendystę: {0}", st1.ZwrocInformacje());

            Wykladowca w1 = new Wykladowca("Maria", "Skłodowska-Curie", 1867,
                Plec.Kobieta, Wykladowca.Tytuly.prof);
            Console.WriteLine("Utworzyłeś wykładowcę: {0}", w1.ZwrocInformacje());

            Console.ReadKey();

            Osoba o2 = s1, o3 = st1, o4 = w1;
            Console.WriteLine("Utworzyłeś osobę: {0}", o2.ZwrocInformacje());
            Console.WriteLine("Utworzyłeś osobę: {0}", o3.ZwrocInformacje());
            Console.WriteLine("Utworzyłeś osobę: {0}", o4.ZwrocInformacje());
        }
    }
}