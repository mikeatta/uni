using Kadry;

Osoba os1 = new Osoba(1, "Jan", "Nowak", 23, 12, "Kwiatowa",
    "97-300", "Piotrków Tryb");
Osoba klon1 = os1.Klonuj();
Console.WriteLine("Oryginał {0}", os1.ZwrocInformacjeOsobowe());
Console.WriteLine("Klon: {0}", klon1.ZwrocInformacjeOsobowe());
Console.WriteLine("\n***Zmieniamy klona***\n");
klon1.ZmienDaneOsobowe();
Console.WriteLine("Oryginał: {0}", os1.ZwrocInformacjeOsobowe());
Console.WriteLine("Klon {0}", klon1.ZwrocInformacjeOsobowe());

Console.WriteLine("\n***Kopiowanie głębokie***\n");

Adres adr = new Adres(13);
Osoba os2 = new Osoba(10, "Jacek", "Wiśniewski", adr);
Osoba klon2 = new Osoba(os2);
Console.WriteLine("Oryginał drugi: {0}", os2.ZwrocInformacjeOsobowe());
Console.WriteLine("Klon drugi: {0}", klon2.ZwrocInformacjeOsobowe());
Console.WriteLine("\n***Zmieniamy drugiego klona***\n");
klon2.ZmienDaneOsobowe();
Console.WriteLine("Oryinał drugi: {0}", os2.ZwrocInformacjeOsobowe());
Console.WriteLine("Klon drugi: {0}", klon2.ZwrocInformacjeOsobowe());

Console.ReadKey();