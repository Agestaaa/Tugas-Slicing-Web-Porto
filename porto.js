const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const sedangAktif = navMenu.classList.toggle('aktif');
        navToggle.classList.toggle('aktif', sedangAktif);
        navToggle.setAttribute('aria-expanded', sedangAktif ? 'true' : 'false');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('aktif');
            navToggle.classList.remove('aktif');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const semuaSection = document.querySelectorAll('main section[id], .wadah-footer[id]');
const semuaLink = document.querySelectorAll('.nav-link');

if (semuaSection.length && semuaLink.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idAktif = entry.target.getAttribute('id');
                    semuaLink.forEach((link) => {
                        link.classList.toggle('nav-link-aktif', link.getAttribute('href') === `#${idAktif}`);
                    });
                }
            });
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );

    semuaSection.forEach((section) => observer.observe(section));
}

(function () {
    const KUNCI_TEMA = 'tema-portofolio';
    const html = document.documentElement;
    const tombolTema = document.getElementById('tombolTema');
    const ikonTema = tombolTema ? tombolTema.querySelector('i') : null;

    function terapkanIkonDanLabel(tema) {
        if (!tombolTema) return;

        if (ikonTema) {
            ikonTema.classList.remove('fa-moon', 'fa-sun');
            ikonTema.classList.add(tema === 'dark' ? 'fa-sun' : 'fa-moon');
        }

        tombolTema.setAttribute('aria-pressed', tema === 'dark' ? 'true' : 'false');
        tombolTema.setAttribute(
            'aria-label',
            tema === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
        );
    }

    function simpanPreferensi(tema) {
        try {
            localStorage.setItem(KUNCI_TEMA, tema);
        } catch (e) {
    
        }
    }

    function terapkanTema(tema, simpan) {
        html.setAttribute('data-theme', tema);
        terapkanIkonDanLabel(tema);
        if (simpan) simpanPreferensi(tema);
    }


    const temaAwal = html.getAttribute('data-theme') || 'light';
    terapkanIkonDanLabel(temaAwal);

    if (tombolTema) {
        tombolTema.addEventListener('click', () => {
            const temaSekarang = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const temaBaru = temaSekarang === 'dark' ? 'light' : 'dark';
            terapkanTema(temaBaru, true);
        });
    }

    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', (e) => {
            let sudahPilihManual = false;
            try {
                sudahPilihManual = localStorage.getItem(KUNCI_TEMA) !== null;
            } catch (err) {
                sudahPilihManual = false;
            }
            if (!sudahPilihManual) {
                terapkanTema(e.matches ? 'dark' : 'light', false);
            }
        });
    }
})();