using System;

namespace Drzewa
{
    public class DrzewoBinarne<T> where T : IComparable<T>
    {
        private Wezel _korzen = null;
        private int _liczbaElementow = 0;

        public int LiczbaElementow
        {
            get { return _liczbaElementow; }
        }

        private class Wezel
        {
            public Wezel lewy;
            public Wezel prawy;
            public T dane;

            public Wezel(T x, Wezel lewy, Wezel prawy)
            {
                this.lewy = lewy;
                this.prawy = prawy;
                dane = x;
            }
        }

        public void Wstaw(T x)
        {
            _liczbaElementow++;
            if (_korzen == null)
            {
                _korzen = new Wezel(x, null, null);
                return;
            }

            Wezel tmp = _korzen, poprzedni;
            do
            {
                poprzedni = tmp;
                if (tmp.dane.CompareTo(x) < 0)
                    tmp = tmp.prawy;
                else
                    tmp = tmp.lewy;
            } while (tmp != null);

            if (poprzedni.dane.CompareTo(x) < 0)
                poprzedni.prawy = new Wezel(x, null, null);
            else
                poprzedni.lewy = new Wezel(x, null, null);
        }

        public bool Wyszukaj(T x)
        {
            Wezel tmp = _korzen;
            while (tmp != null)
            {
                if (tmp.dane.CompareTo(x) == 0)
                {
                    return true;
                }
                else
                {
                    if (x.CompareTo(tmp.dane) < 0)
                    {
                        tmp = tmp.lewy;
                    }
                    else
                    {
                        tmp = tmp.prawy;
                    }
                }
            }

            return false;
        }

        public T[] ZamienNaTablice()
        {
            T[] tab = new T[LiczbaElementow];
            int n = 0;
            if (_korzen != null)
            {
                zamienNaTablice(_korzen.lewy, tab, ref n);
                tab[n] = _korzen.dane;
                n++;
                zamienNaTablice(_korzen.prawy, tab, ref n);
            }

            return tab;
        }

        private static void zamienNaTablice(Wezel w, T[] tab, ref int n)
        {
            if (w != null)
            {
                zamienNaTablice(w.lewy, tab, ref n);
                tab[n] = w.dane;
                n++;
                zamienNaTablice(w.prawy, tab, ref n);
            }
        }
    }
}