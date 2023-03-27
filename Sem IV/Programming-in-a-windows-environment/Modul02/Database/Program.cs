using Drzewa;
using Osoba;

Drzewo og = new Drzewo();
og.DodajElement(new global::Osoba.Osoba(
    "Michael", "Atta", new Data(2001, 07, 1)));
Console.WriteLine("Pre-copy state:");
og.PrintAll();

Drzewo clone = og.DeepCopy();
Console.WriteLine("\nTree clone contents:");
clone.PrintAll();

Console.WriteLine("\n*** Modifying copied tree ***");
clone.DodajElement(new global::Osoba.Osoba(
    "Jay", "Atta", new Data(1998, 07, 13)));

Console.WriteLine("Original tree:");
og.PrintAll();
Console.WriteLine("\nCopy of tree:");
clone.PrintAll();