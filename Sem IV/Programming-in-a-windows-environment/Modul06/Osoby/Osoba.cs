﻿namespace Osoby
{
    public enum Plec { Kobieta, Mezczyzna }

    public class Osoba
    {
        public string Imie { set; get; }
        public string Nazwisko { set; get; }
        protected Plec Plec { set; get; }

        private readonly int _rokUrodzenia;

        public int RokUrodzenia
        {
            get { return _rokUrodzenia; }
        }

        public Osoba(string imie, string nazwisko, int rokUrodzenia, Plec plec)
        {
            Imie = imie;
            Nazwisko = nazwisko;
            this._rokUrodzenia = rokUrodzenia;
            Plec = plec;
        }

        public string ZwrocInformacje()
        {
            if (Plec == Plec.Kobieta)
            {
                return string.Format("Pani {0} {1} urodzona w {2}",
                    Imie, Nazwisko, RokUrodzenia);
            }

            return string.Format("Pan {0} {1} urodzony w {2}",
                Imie, Nazwisko, RokUrodzenia);
        }
    }
}