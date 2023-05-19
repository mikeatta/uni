using System;

namespace Osoby
{
    public class Stypendysta : Student
    {
        public decimal Stypendium { set; get; }

        public Stypendysta(string imie, string nazwisko, int rokUrodzenia,
            Plec plec, int numerIndeksu, decimal stypendium)
            : base(imie, nazwisko, rokUrodzenia, plec, numerIndeksu)
        {
            Stypendium = stypendium;
        }

        public new string ZwrocInformacje()
        {
            return String.Format("{0} ma przyznane stypendium w wysokości " +
                                 "{1:c}", base.ZwrocInformacje(), Stypendium);
        }
    }
}