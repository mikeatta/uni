using System;
using System.ComponentModel;

namespace Konta
{
    public class Konto
    {
        private string haslo;
        public string NazwaUzytkownika { set; get; }

        public Konto(string nazwaUzytkownika, string haslo)
        {
            NazwaUzytkownika = nazwaUzytkownika;
            this.haslo = haslo;
        }

        public static event PrzedZmianaHasloHandler PrzedZmianaHasla;
        public static event EventHandler PoZmianieHasla;
        
        public bool SprawdzHaslo(string haslo)
        {
            if (this.haslo == haslo)
                return true;
            return false;
        }

        public bool ZmienHaslo(string stareHaslo, string noweHaslo)
        {
            if (!SprawdzHaslo(stareHaslo))
                return false;

            if (PrzedZmianaHasla != null)
            {
                PrzedZmianaHaslaArgs e = new PrzedZmianaHaslaArgs(noweHaslo,
                    stareHaslo);
                PrzedZmianaHasla(this, e);
                if (e.Cancel)
                    return false;
            }

            haslo = noweHaslo;
            if (PoZmianieHasla != null)
                PoZmianieHasla(this, EventArgs.Empty);
            return true;
        }
    }

    public class PrzedZmianaHaslaArgs : CancelEventArgs
    {
        private string _noweHaslo;

        public string NoweHaslo
        {
            get { return _noweHaslo; }
        }

        private string _stareHaslo;

        public string StareHaslo
        {
            get { return _stareHaslo; }
        }

        public PrzedZmianaHaslaArgs(string noweHaslo, string stareHaslo)
        {
            this._noweHaslo = noweHaslo;
            this._stareHaslo = stareHaslo;
        }
    }

    public delegate void PrzedZmianaHasloHandler(
        object sender, PrzedZmianaHaslaArgs e);
}