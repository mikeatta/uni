using System.Collections.Generic;

namespace Zbiory
{
    public class ZbiorNapisow
    {
        private List<string> _napisy = new List<string>();

        public void DodajElement(string s)
        {
            if (!_napisy.Contains(s))
                _napisy.Add(s);
        }

        public bool CzyElementNalezy(string element)
        {
            return _napisy.Contains(element);
        }

        public string this[int indeks]
        {
            get { return _napisy[indeks]; }
        }

        public int MocZbioru
        {
            get { return _napisy.Count; }
        }

        public static ZbiorNapisow operator +(ZbiorNapisow a, ZbiorNapisow b)
        {
            ZbiorNapisow c = new ZbiorNapisow();

            foreach (string s in a._napisy)
            {
                c.DodajElement(s);
            }

            foreach (string s in b._napisy)
            {
                c.DodajElement(s);
            }

            return c;
        }

        public static ZbiorNapisow operator -(ZbiorNapisow a, ZbiorNapisow b)
        {
            ZbiorNapisow c = new ZbiorNapisow();

            foreach (string s in a._napisy)
            {
                if (!b.CzyElementNalezy(s))
                    c.DodajElement(s);
            }

            return c;
        }

        public static ZbiorNapisow operator *(ZbiorNapisow a, ZbiorNapisow b)
        {
            ZbiorNapisow c = new ZbiorNapisow();

            foreach (string s in a._napisy)
            {
                if (b.CzyElementNalezy(s))
                    c.DodajElement(s);
            }

            return c;
        }
    }
}