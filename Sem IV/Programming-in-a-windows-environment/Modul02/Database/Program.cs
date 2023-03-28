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
Console.ReadKey();

Console.WriteLine("\n*** Copying using CopySharedPersonData method ***");
Drzewo cloneOfClone = clone.CopySharedPersonData();

clone.DodajElement(new global::Osoba.Osoba(
    "Jack", "Adams", new Data(1969, 04, 12)));

// Original tree
Console.WriteLine("Contents of original tree:");
og.PrintAll();
// Copy of original
Console.WriteLine("\nContents of clone tree:");
clone.DodajElement(new global::Osoba.Osoba(
    "Hugo", "Brown", new Data(1940, 08, 23)));
clone.PrintAll();
// Copy of clone of original
Console.WriteLine("\nContents of cloneClone tree:");
cloneOfClone.DodajElement(new global::Osoba.Osoba(
    "Mark", "Paul", new Data(1988, 07, 30)));
cloneOfClone.PrintAll();
Console.ReadKey();

Console.WriteLine("\n*** Create and modify a shallow copy ***");
Drzewo shallowClone = clone.ShallowCopy();
shallowClone.DodajElement(new global::Osoba.Osoba(
    "Jeff", "Pearson", new Data(1976, 11, 3)));
Console.WriteLine("\nClone tree:");
clone.PrintAll();
Console.WriteLine("\nShallow copy tree:");
shallowClone.PrintAll();
