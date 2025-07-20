        // --- KONFIGURASI SUPABASE ---
        const SUPABASE_URL = 'https://cisaphactunvuvnqpinl.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc2FwaGFjdHVudnV2bnFwaW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzgwMTIsImV4cCI6MjA2ODI1NDAxMn0.sOPMsOfHy9l1mU6NV7q8RP3O8naFl98nCMWJZczP7Go';

        const { createClient } = supabase;
        let supabaseClient;
        
        // --- State Aplikasi ---
        let currentSekolahId = null;
        let currentSekolahName = null;
        let verifiedSiswaId = null; 
        let verifiedName = null;
        let editingStudentId = null; 
        let myBookTitles = new Set();
        let allPublicReviews = [];
        let allProgressData = [];
        let allStudentData = [];
        let allAchievements = [];
        let allPencapaianSiswa = [];
        let allReviewsData = [];
        let studentChartInstance = null;
        let currentAchievementForm = 'manual';
        let editingAchievementId = null;
        let studentsToImportPreview = [];

        // --- Referensi Elemen DOM ---
        const appContainer = document.getElementById('app-container');
        const landingView = document.getElementById('landing-view');
        const schoolCodeView = document.getElementById('school-code-view');
        const registerView = document.getElementById('register-view');
        const checkEmailView = document.getElementById('check-email-view');
        const createSchoolView = document.getElementById('create-school-view');
        const loginView = document.getElementById('login-view');
        const studentView = document.getElementById('student-view');
        const teacherView = document.getElementById('teacher-view');
        const recommendationView = document.getElementById('recommendation-view');
        
        const registerForm = document.getElementById('register-form');
        const registerMessage = document.getElementById('register-message');
        const createSchoolForm = document.getElementById('create-school-form');
        const createSchoolMessage = document.getElementById('create-school-message');

        const schoolCodeFormSection = document.getElementById('school-code-form-section');
        const schoolCodeOptionsSection = document.getElementById('school-code-options-section');
        const verifiedSchoolNameSpan = document.getElementById('verified-school-name');
        const loginSchoolNameSpan = document.getElementById('login-school-name');
        const loginSchoolContext = document.getElementById('login-school-context');

        const kelasSelect = document.getElementById('kelas');
        const namaSiswaSelect = document.getElementById('nama-siswa');
        const nisInput = document.getElementById('nis');
        const checkDataButton = document.getElementById('check-data-button');
        const verificationMessage = document.getElementById('verification-message');
        const studentFormContainer = document.getElementById('student-form-container');
        const verificationSection = document.getElementById('verification-section');
        const progressFormSection = document.getElementById('progress-form-section');
        const studentForm = document.getElementById('student-form');
        const studentNameDisplay = document.getElementById('student-name-display');
        const studentMessage = document.getElementById('student-message');
        const studentDashboardSection = document.getElementById('student-dashboard-section');
        const dashboardStudentName = document.getElementById('dashboard-student-name');
        const logoutStudentButton = document.getElementById('logout-student-button');
        const historyTableContainer = document.getElementById('history-table-container');
        const newAchievementToast = document.getElementById('new-achievement-toast');
        const studentStatTotalHalaman = document.getElementById('student-stat-total-halaman');
        const studentStatBukuDibaca = document.getElementById('student-stat-buku-dibaca');
        const studentStatKecepatan = document.getElementById('student-stat-kecepatan');
        const reportAgainButton = document.getElementById('report-again-button');
        const studentAchievementList = document.getElementById('student-achievement-list');
        const myReviewsSection = document.getElementById('my-reviews-section');
        const myReviewsList = document.getElementById('my-reviews-list');
        const logoutButton = document.getElementById('logout-button');
        const teacherDashboardContent = document.getElementById('teacher-dashboard-content');
        const teacherLoader = document.getElementById('teacher-loader');
        const judulBukuInput = document.getElementById('judul-buku');
        const bookSuggestionsContainer = document.getElementById('book-suggestions');
        const isSelesaiCheckbox = document.getElementById('is-selesai-checkbox');
        const reviewSection = document.getElementById('review-section');
        const showRecommendationsBtn = document.getElementById('show-recommendations-btn');
        const backToMainBtn = document.getElementById('back-to-main-btn');
        const publicReviewListContainer = document.getElementById('public-review-list-container');
        const publicReviewSearch = document.getElementById('public-review-search');
        const publicReviewRatingFilter = document.getElementById('public-review-rating-filter');
        const teacherFilterKelas = document.getElementById('teacher-filter-kelas');
        const teacherFilterMonth = document.getElementById('teacher-filter-month');
        const statTotalSiswa = document.getElementById('stat-total-siswa');
        const statTotalHalaman = document.getElementById('stat-total-halaman');
        const statRataHalaman = document.getElementById('stat-rata-halaman');
        const statKecepatan = document.getElementById('stat-kecepatan');
        const topPerformersList = document.getElementById('top-performers-list');
        const classInsightsContainer = document.getElementById('class-insights-container');
        const studentListTabBtn = document.getElementById('student-list-tab-btn');
        const addStudentTabBtn = document.getElementById('add-student-tab-btn');
        const importStudentTabBtn = document.getElementById('import-student-tab-btn');
        const reviewsTabBtn = document.getElementById('reviews-tab-btn');
        const studentListTab = document.getElementById('student-list-tab');
        const addStudentTab = document.getElementById('add-student-tab');
        const importStudentTab = document.getElementById('import-student-tab');
        const reviewsTab = document.getElementById('reviews-tab');
        const studentListSearch = document.getElementById('student-list-search');
        const studentListTableBody = document.getElementById('student-list-table-body');
        const addStudentForm = document.getElementById('add-student-form');
        const addStudentMessage = document.getElementById('add-student-message');
        const downloadTemplateBtn = document.getElementById('download-template-btn');
        const importCsvInput = document.getElementById('import-csv-input');
        const importStatus = document.getElementById('import-status');
        const importPreviewContainer = document.getElementById('import-preview-container');
        const importPreviewTable = document.getElementById('import-preview-table');
        const confirmImportBtn = document.getElementById('confirm-import-btn');
        const cancelImportBtn = document.getElementById('cancel-import-btn');
        const reviewListContainer = document.getElementById('review-list-container');
        const reviewFilterKelas = document.getElementById('review-filter-kelas');
        const reviewFilterRating = document.getElementById('review-filter-rating');
        const createAchievementForm = document.getElementById('create-achievement-form');
        const formAchTitle = document.getElementById('form-ach-title');
        const manualAchTab = document.getElementById('manual-ach-tab');
        const autoAchTab = document.getElementById('auto-ach-tab');
        const achievementList = document.getElementById('achievement-list');
        const awardAchievementForm = document.getElementById('award-achievement-form');
        const awardClassSelect = document.getElementById('award-class-select');
        const awardStudentSearch = document.getElementById('award-student-search');
        const awardStudentSelect = document.getElementById('award-student-select');
        const awardAchievementSelect = document.getElementById('award-achievement-select');
        const awardMessage = document.getElementById('award-message');
        const progressTableFilterKelas = document.getElementById('progress-table-filter-kelas');
        const progressTableFilterStartDate = document.getElementById('progress-table-filter-start-date');
        const progressTableFilterEndDate = document.getElementById('progress-table-filter-end-date');
        const progressTableApplyFilter = document.getElementById('progress-table-apply-filter');
        const progressTableResetFilter = document.getElementById('progress-table-reset-filter');
        const teacherTableBody = document.getElementById('teacher-table-body');

        // --- Manajemen Tampilan (View Management) ---
        function showView(viewName) {
            const views = document.querySelectorAll('#app-container > div');
            views.forEach(v => v.classList.add('hidden'));

            const targetView = document.getElementById(`${viewName}-view`);
            if (targetView) {
                targetView.classList.remove('hidden');
            }

            if (currentSekolahName) {
                const schoolNameSpans = document.querySelectorAll('#student-school-name, #teacher-school-name, #recom-school-name, #login-school-name');
                schoolNameSpans.forEach(span => span.textContent = currentSekolahName);
            }
        }
        
        // --- Alur Utama Aplikasi & Autentikasi ---
        async function initializeApp() {
            supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            
            supabaseClient.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_IN') {
                    await handleUserSession(session);
                } else if (event === 'SIGNED_OUT') {
                    currentSekolahId = null;
                    currentSekolahName = null;
                    showView('landing');
                }
            });

            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                await handleUserSession(session);
            } else {
                showView('landing');
            }
        }

        async function handleUserSession(session) {
            if (!session || !session.user) {
                showView('landing');
                return;
            }

            const { data: guruData, error } = await supabaseClient
                .from('Guru')
                .select('sekolah_id, Sekolah(nama_sekolah)')
                .eq('user_id', session.user.id)
                .single();

            if (guruData && guruData.sekolah_id) {
                currentSekolahId = guruData.sekolah_id;
                currentSekolahName = guruData.Sekolah.nama_sekolah;
                showView('teacher');
                loadTeacherDashboard();
            } else if (session.user.email_confirmed_at) {
                showView('create-school');
            } else {
                showView('check-email');
            }
        }
        
        // --- Alur Pendaftaran & Login ---
        async function handleSignUp(e) {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const submitButton = registerForm.querySelector('button[type="submit"]');
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mendaftarkan...';
            registerMessage.textContent = '';
            registerMessage.className = 'text-sm mt-4 text-center';

            const { error } = await supabaseClient.auth.signUp({ email, password });

            if (error) {
                registerMessage.textContent = `Gagal mendaftar: ${error.message}`;
                registerMessage.classList.add('text-red-500');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Daftar & Kirim Verifikasi';
            } else {
                showView('check-email');
            }
        }
        
        async function handleCreateSchool(e) {
            e.preventDefault();
            const namaSekolah = document.getElementById('create-nama-sekolah').value;
            const kodeSekolah = document.getElementById('create-kode-sekolah').value.trim().toUpperCase();
            const submitButton = createSchoolForm.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Menyimpan...';
            createSchoolMessage.textContent = '';
            createSchoolMessage.className = 'text-sm mt-4 text-center';

            const { data: { user } } = await supabaseClient.auth.getUser();
            if (!user) {
                createSchoolMessage.textContent = 'Sesi tidak valid. Silakan login kembali.';
                createSchoolMessage.classList.add('text-red-500');
                return;
            }

            const { data: sekolahData, error: sekolahError } = await supabaseClient
                .from('Sekolah')
                .insert({ nama_sekolah: namaSekolah, kode_sekolah: kodeSekolah, email_pendaftar: user.email })
                .select()
                .single();
            
            if (sekolahError) {
                createSchoolMessage.textContent = `Gagal menyimpan sekolah: ${sekolahError.message}`;
                createSchoolMessage.classList.add('text-red-500');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Simpan Data Sekolah & Masuk Dasbor';
                return;
            }

            const { error: guruError } = await supabaseClient
                .from('Guru')
                .insert({ user_id: user.id, sekolah_id: sekolahData.id });

            if (guruError) {
                createSchoolMessage.textContent = `Gagal menautkan guru: ${guruError.message}`;
                createSchoolMessage.classList.add('text-red-500');
                await supabaseClient.from('Sekolah').delete().eq('id', sekolahData.id); // Rollback
                submitButton.disabled = false;
                submitButton.innerHTML = 'Simpan Data Sekolah & Masuk Dasbor';
                return;
            }
            
            await handleUserSession({ user });
        }

        async function handleTeacherLogin(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginError = document.getElementById('login-error');
            loginError.textContent = "Mencoba login...";

            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

            if (error) {
                loginError.textContent = 'Login gagal: ' + error.message;
                return;
            }
            
            const { data: guruData, error: guruError } = await supabaseClient
                .from('Guru')
                .select('sekolah_id')
                .eq('user_id', data.user.id)
                .single();

            if (guruError || !guruData) {
                loginError.textContent = "Login gagal: Akun guru tidak ditemukan.";
                await supabaseClient.auth.signOut();
            } else if (currentSekolahId && guruData.sekolah_id !== currentSekolahId) {
                loginError.textContent = "Login gagal: Akun Anda tidak terdaftar untuk sekolah ini.";
                await supabaseClient.auth.signOut();
            } else {
                loginError.textContent = '';
                await handleUserSession(data);
            }
        }

        async function handleSchoolCodeVerification(e) {
            e.preventDefault();
            const kodeSekolah = document.getElementById('kode-sekolah').value.trim().toUpperCase();
            const errorP = document.getElementById('school-code-error');
            errorP.textContent = 'Memverifikasi...';

            const { data, error } = await supabaseClient
                .from('Sekolah')
                .select('id, nama_sekolah')
                .eq('kode_sekolah', kodeSekolah)
                .single();

            if (error || !data) {
                errorP.textContent = 'Kode sekolah tidak ditemukan. Silakan periksa kembali.';
            } else {
                currentSekolahId = data.id;
                currentSekolahName = data.nama_sekolah;
                errorP.textContent = '';
                verifiedSchoolNameSpan.textContent = currentSekolahName;
                schoolCodeFormSection.classList.add('hidden');
                schoolCodeOptionsSection.classList.remove('hidden');
            }
        }

        // --- Alur Siswa ---
        function resetStudentVerificationForm() {
            verifiedSiswaId = null;
            verifiedName = null;
            studentDashboardSection.classList.add('hidden');
            studentFormContainer.classList.remove('hidden');
            verificationSection.classList.remove('hidden');
            progressFormSection.classList.add('hidden');
            nisInput.value = '';
            verificationMessage.textContent = '';
            kelasSelect.innerHTML = '<option value="">Pilih Kelas Kamu</option>';
            namaSiswaSelect.innerHTML = '<option value="">Pilih kelas terlebih dahulu</option>';
            namaSiswaSelect.disabled = true;
        }

        async function populateKelasOptions() {
            if (!currentSekolahId) return;
            
            const { data, error } = await supabaseClient
                .from('Siswa')
                .select('kelas')
                .eq('sekolah_id', currentSekolahId);

            if (error) { console.error("Gagal memuat data kelas:", error); return; }
            if(data) {
                const classes = [...new Set(data.map(s => s.kelas))].sort();
                kelasSelect.innerHTML = '<option value="">Pilih Kelas Kamu</option>';
                classes.forEach(c => kelasSelect.innerHTML += `<option value="${c}">${c}</option>`);
            }
        }

        async function loadStudentNames(kelas) {
            if (!currentSekolahId || !kelas) return;

            namaSiswaSelect.innerHTML = '<option value="">Memuat...</option>';
            namaSiswaSelect.disabled = true;
            const { data, error } = await supabaseClient
                .from('Siswa')
                .select('nama')
                .eq('kelas', kelas)
                .eq('sekolah_id', currentSekolahId)
                .order('nama');
            if (error) { console.error("Gagal memuat nama siswa:", error); return; }
            
            namaSiswaSelect.innerHTML = '<option value="">Pilih Nama Kamu</option>';
            data.forEach(s => namaSiswaSelect.innerHTML += `<option value="${s.nama}">${s.nama}</option>`);
            namaSiswaSelect.disabled = false;
        }

        async function handleStudentVerification() {
            if (!currentSekolahId) return;

            const nama = namaSiswaSelect.value;
            const nis = nisInput.value;
            if (!nama || !nis) {
                verificationMessage.textContent = 'Harap pilih kelas, nama, dan isi NIS.';
                verificationMessage.className = 'mt-3 text-sm text-center text-red-500';
                return;
            }
            verificationMessage.textContent = 'Memverifikasi...';
            
            const { data, error } = await supabaseClient
                .from('Siswa')
                .select('id, nama')
                .eq('nama', nama)
                .eq('nis', nis)
                .eq('sekolah_id', currentSekolahId)
                .single();

            if (error || !data) {
                verificationMessage.textContent = 'Verifikasi Gagal. Periksa kembali data Anda.';
                verificationMessage.className = 'mt-3 text-sm text-center text-red-500';
            } else {
                verifiedSiswaId = data.id; 
                verifiedName = data.nama;
                studentFormContainer.classList.add('hidden');
                loadStudentDashboard();
            }
        }

        // --- Fungsi-Fungsi Dasbor ---
        async function loadStudentDashboard() {
            studentDashboardSection.classList.remove('hidden');
            studentDashboardSection.classList.add('fade-in');
            dashboardStudentName.textContent = verifiedName;
            
            const { data: myProgress, error } = await supabaseClient
                .from('ProgresBaca')
                .select('*')
                .eq('siswa_id', verifiedSiswaId)
                .order('created_at', { ascending: false });

            if (error) { console.error("Gagal memuat histori:", error); return; }

            myBookTitles = new Set(myProgress.map(p => p.judul_buku));
            
            const totalHalaman = myProgress.reduce((sum, p) => sum + p.halaman_dibaca, 0);
            const bukuDibaca = new Set(myProgress.filter(p => p.is_selesai).map(p => p.judul_buku)).size;
            let kecepatan = 0;
            if (myProgress.length > 0) {
                const firstDate = new Date(Math.min(...myProgress.map(e => new Date(e.created_at))));
                const days = Math.max(1, (new Date() - firstDate) / (1000 * 3600 * 24));
                kecepatan = (totalHalaman / days).toFixed(1);
            }
            studentStatTotalHalaman.textContent = totalHalaman.toLocaleString('id-ID');
            studentStatBukuDibaca.textContent = bukuDibaca;
            studentStatKecepatan.textContent = kecepatan;

            renderStudentChart(myProgress);
            renderStudentAchievements();
            renderStudentReviews();
            
            historyTableContainer.innerHTML = '';
            if (myProgress.length > 0) {
                myProgress.forEach(item => {
                    historyTableContainer.innerHTML += `<div class="border-b border-gray-200 pb-3"><div class="flex justify-between items-start"><p class="font-semibold text-gray-800">${item.judul_buku}</p><p class="text-sm text-gray-500">${new Date(item.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short'})}</p></div><p class="text-sm text-gray-600 mt-1">${item.deskripsi}</p><div class="flex justify-between items-center mt-2"><span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Halaman ${item.halaman_awal} → ${item.halaman_akhir}</span><span class="text-sm font-bold text-green-600">+${item.halaman_dibaca} halaman</span></div></div>`;
                });
            } else {
                historyTableContainer.innerHTML = `<p class="text-center text-sm text-gray-500 py-4">Kamu belum punya histori baca. Ayo mulai membaca!</p>`;
            }
        }
        
        async function loadTeacherDashboard() {
            if(!currentSekolahId) {
                await supabaseClient.auth.signOut();
                return;
            }

            teacherLoader.classList.remove('hidden');
            teacherDashboardContent.classList.add('hidden');
            
            const { data: studentIdData, error: studentIdError } = await supabaseClient
                .from('Siswa')
                .select('id')
                .eq('sekolah_id', currentSekolahId);

            if (studentIdError) {
                console.error('Gagal memuat ID siswa:', studentIdError);
                if (studentIdError.code === '42P01') showDbError();
                return;
            }

            const studentIds = studentIdData.map(s => s.id);

            const [progressRes, studentRes, achievementRes, pencapaianRes, reviewsRes] = await Promise.all([
                studentIds.length > 0 ? supabaseClient.from('ProgresBaca').select('*, Siswa (id, nama, kelas)').in('siswa_id', studentIds) : Promise.resolve({ data: [], error: null }),
                supabaseClient.from('Siswa').select('*').eq('sekolah_id', currentSekolahId),
                supabaseClient.from('Achievements').select('*').eq('sekolah_id', currentSekolahId),
                studentIds.length > 0 ? supabaseClient.from('PencapaianSiswa').select('*, Siswa(id, nama, kelas), Achievements(*)').in('siswa_id', studentIds) : Promise.resolve({ data: [], error: null }),
                studentIds.length > 0 ? supabaseClient.from('UlasanBuku').select('*, Siswa(nama, kelas)').in('siswa_id', studentIds) : Promise.resolve({ data: [], error: null })
            ]);

            if (progressRes.error || studentRes.error || achievementRes.error || pencapaianRes.error || reviewsRes.error) { 
                console.error('Gagal memuat data dasbor:', {progressRes, studentRes, achievementRes, pencapaianRes, reviewsRes}); 
                teacherLoader.classList.add('hidden');
                teacherDashboardContent.classList.remove('hidden');
                teacherDashboardContent.innerHTML = `<p class="text-center text-red-500">Gagal memuat data. Periksa koneksi dan coba lagi.</p>`;
                return; 
            }
            
            allStudentData = studentRes.data;
            allProgressData = progressRes.data;
            allAchievements = achievementRes.data;
            allPencapaianSiswa = pencapaianRes.data;
            allReviewsData = reviewsRes.data;

            teacherLoader.classList.add('hidden');
            teacherDashboardContent.classList.remove('hidden');
            
            const classes = ['semua', ...[...new Set(allStudentData.map(s => s.kelas))].sort()];
            teacherFilterKelas.innerHTML = '';
            classes.forEach(c => teacherFilterKelas.innerHTML += `<option value="${c}">${c === 'semua' ? 'Semua Kelas' : c}</option>`);
            awardClassSelect.innerHTML = '<option value="semua">Semua Kelas</option>';
            progressTableFilterKelas.innerHTML = '<option value="semua">Semua Kelas</option>';
            reviewFilterKelas.innerHTML = '<option value="semua">Semua Kelas</option>';
            classes.slice(1).forEach(c => {
                awardClassSelect.innerHTML += `<option value="${c}">${c}</option>`;
                progressTableFilterKelas.innerHTML += `<option value="${c}">${c}</option>`;
                reviewFilterKelas.innerHTML += `<option value="${c}">${c}</option>`;
            });
            
            renderAchievementManagement();
            updateDashboard();
            renderProgressTable();
            renderStudentList();
            renderReviewList();
        }
        
        studentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = document.getElementById('submit-button');
            submitButton.disabled = true;
            submitButton.textContent = 'Menyimpan...';

            const halamanAwal = parseInt(document.getElementById('halaman-awal').value);
            const halamanAkhir = parseInt(document.getElementById('halaman-akhir').value);
            const judulBuku = judulBukuInput.value;
            const isSelesai = isSelesaiCheckbox.checked;

            if (halamanAkhir <= halamanAwal) {
                 studentMessage.innerHTML = `<p class="text-red-500">Halaman akhir harus lebih besar dari halaman awal.</p>`;
                 submitButton.disabled = false;
                 submitButton.textContent = 'Simpan Progres';
                 return;
            }

            const { data: newProgress, error } = await supabaseClient.from('ProgresBaca').insert({
                siswa_id: verifiedSiswaId,
                judul_buku: judulBuku, 
                halaman_awal: halamanAwal, 
                halaman_akhir: halamanAkhir, 
                deskripsi: document.getElementById('deskripsi').value, 
                halaman_dibaca: halamanAkhir - halamanAwal,
                is_selesai: isSelesai
            }).select().single();

            if (error) {
                studentMessage.innerHTML = `<p class="text-red-500">Gagal menyimpan progres. Error: ${error.message}</p>`;
            } else {
                if (isSelesai) {
                    const ratingInput = document.querySelector('input[name="rating"]:checked');
                    const rating = ratingInput ? parseInt(ratingInput.value) : null;
                    const ulasan = document.getElementById('ulasan-teks').value;

                    if (rating) {
                        const { error: reviewError } = await supabaseClient.from('UlasanBuku').upsert({
                            siswa_id: verifiedSiswaId,
                            judul_buku: judulBuku,
                            rating: rating,
                            ulasan: ulasan
                        }, { onConflict: 'siswa_id,judul_buku' });

                        if (reviewError) {
                            console.error("Gagal menyimpan ulasan:", reviewError);
                        }
                    }
                }

                await checkAndAwardAutomaticAchievements(verifiedSiswaId, newProgress);
                studentForm.reset();
                reviewSection.classList.add('hidden');
                studentFormContainer.classList.add('hidden');
                loadStudentDashboard();
            }
            submitButton.disabled = false;
            submitButton.textContent = 'Simpan Progres';
        });

        function renderStudentChart(progressData) {
            const ctx = document.getElementById('student-chart').getContext('2d');
            if (studentChartInstance) studentChartInstance.destroy();
            const weeklyData = progressData.reduce((acc, item) => {
                const date = new Date(item.created_at);
                const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1)).toISOString().split('T')[0];
                if (!acc[startOfWeek]) acc[startOfWeek] = { pages: 0, books: new Set() };
                acc[startOfWeek].pages += item.halaman_dibaca;
                acc[startOfWeek].books.add(item.judul_buku);
                return acc;
            }, {});
            const sortedWeeks = Object.keys(weeklyData).sort();
            const labels = sortedWeeks.map(week => `Minggu ${new Date(week).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}`);
            const pagesData = sortedWeeks.map(week => weeklyData[week].pages);
            const booksData = sortedWeeks.map(week => weeklyData[week].books.size);
            studentChartInstance = new Chart(ctx, {
                type: 'line',
                data: { labels: labels, datasets: [{ label: 'Halaman Dibaca', data: pagesData, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.3, yAxisID: 'yPages' }, { label: 'Buku Dibaca', data: booksData, borderColor: '#16a34a', backgroundColor: 'rgba(22, 163, 74, 0.1)', fill: false, tension: 0.3, yAxisID: 'yBooks', stepped: true }] },
                options: { responsive: true, scales: { yPages: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Jumlah Halaman' } }, yBooks: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Jumlah Buku' }, grid: { drawOnChartArea: false }, ticks: { stepSize: 1 } } } }
            });
        }

        async function renderStudentAchievements() {
            const { data, error } = await supabaseClient
                .from('PencapaianSiswa')
                .select('Achievements (*)')
                .eq('siswa_id', verifiedSiswaId);

            if (error) { console.error("Gagal memuat achievements:", error); return; }
            studentAchievementList.innerHTML = '';
            if (data.length > 0) {
                data.forEach(item => {
                    const achievement = item.Achievements;
                    if (achievement) {
                        const icon = achievement.gambar_url ? `<img src="${achievement.gambar_url}" alt="${achievement.nama_achievement}">` : `<span class="emoji">${achievement.emoji}</span>`;
                        studentAchievementList.innerHTML += `
                            <div class="text-center p-3 bg-gray-50 rounded-lg achievement-badge cursor-pointer">
                                ${icon}
                                <p class="text-xs font-semibold mt-1">${achievement.nama_achievement}</p>
                                <div class="expandable-content text-xs text-gray-500 mt-1">${achievement.kriteria}</div>
                            </div>
                        `;
                    }
                });
                document.querySelectorAll('#student-achievement-list .achievement-badge').forEach(badge => {
                    badge.addEventListener('click', () => {
                        badge.querySelector('.expandable-content').classList.toggle('show');
                    });
                });
            } else {
                studentAchievementList.innerHTML = `<p class="col-span-full text-center text-sm text-gray-500 py-4">Kamu belum punya achievement. Teruslah membaca!</p>`;
            }
        }

        async function renderStudentReviews() {
            const { data, error } = await supabaseClient.from('UlasanBuku').select('*').eq('siswa_id', verifiedSiswaId).order('created_at', { ascending: false });
            if (error) {
                myReviewsList.innerHTML = `<p class="text-red-500 text-center">Gagal memuat ulasan.</p>`;
                return;
            }
            if (data.length === 0) {
                myReviewsList.innerHTML = `<p class="text-gray-500 text-center text-sm">Kamu belum memberikan ulasan untuk buku yang selesai dibaca.</p>`;
                return;
            }
            myReviewsList.innerHTML = '';
            data.forEach(review => {
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                myReviewsList.innerHTML += `
                    <div class="border-b border-gray-200 pb-3">
                        <div class="flex justify-between items-start">
                            <p class="font-semibold text-gray-800">${review.judul_buku}</p>
                            <span class="text-yellow-500" title="${review.rating} bintang">${stars}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1 italic">"${review.ulasan || 'Tidak ada komentar.'}"</p>
                    </div>
                `;
            });
        }
        
        function populateMonthFilter(data) {
            const months = [...new Set(data.map(p => new Date(p.created_at).toISOString().slice(0, 7)))].sort().reverse();
            teacherFilterMonth.innerHTML = '<option value="semua">Semua Waktu</option>';
            months.forEach(month => {
                const date = new Date(month + '-02');
                const monthName = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
                teacherFilterMonth.innerHTML += `<option value="${month}">${monthName}</option>`;
            });
        }
        
        function updateDashboard() {
            const selectedKelas = teacherFilterKelas.value;
            const classFilteredData = selectedKelas === 'semua' ? allProgressData : allProgressData.filter(d => d.Siswa && d.Siswa.kelas === selectedKelas);
            
            populateMonthFilter(classFilteredData);
            renderMainStats(classFilteredData);
            updateTopPerformers();
        }
        
        function updateTopPerformers() {
            const selectedKelas = teacherFilterKelas.value;
            const selectedMonth = teacherFilterMonth.value;

            let filteredData = selectedKelas === 'semua' ? allProgressData : allProgressData.filter(d => d.Siswa && d.Siswa.kelas === selectedKelas);
            if (selectedMonth !== 'semua') {
                filteredData = filteredData.filter(d => d.created_at.startsWith(selectedMonth));
            }

            const studentTotals = filteredData.reduce((acc, d) => {
                if(d.Siswa && d.Siswa.id) {
                    acc[d.Siswa.id] = (acc[d.Siswa.id] || 0) + d.halaman_dibaca;
                }
                return acc;
            }, {});

            const sortedStudents = Object.entries(studentTotals)
                .map(([id, total]) => ({ ...allStudentData.find(s=>s.id===id), total }))
                .filter(s => s.nama) 
                .sort((a, b) => b.total - a.total)
                .slice(0, 5);

            topPerformersList.innerHTML = '';
            if (sortedStudents.length > 0) {
                sortedStudents.forEach((s, index) => {
                    topPerformersList.innerHTML += `<li class="flex justify-between items-center text-sm"><div class="flex items-center"><span class="inline-block text-center rounded-full bg-gray-200 mr-3" style="width:24px; height:24px; line-height:24px;">${index+1}</span>${s.nama} <span class="text-xs text-gray-500 ml-1">(${s.kelas})</span></div><span class="font-bold text-gray-600">${s.total.toLocaleString('id-ID')} hal</span></li>`;
                });
            } else { topPerformersList.innerHTML = `<p class="text-sm text-gray-500">Tidak ada data untuk periode ini.</p>`; }
        }

        function renderMainStats(data) {
            const filterKelas = teacherFilterKelas.value;
            const totalSiswaDatabase = filterKelas === 'semua' ? allStudentData.length : allStudentData.filter(s => s.kelas === filterKelas).length;
            statTotalSiswa.textContent = totalSiswaDatabase;
            
            const totalSiswaAktif = new Set(data.map(d => d.Siswa ? d.Siswa.id : null)).size;
            const totalHalaman = data.reduce((sum, d) => sum + d.halaman_dibaca, 0);
            const rataRataHalaman = totalSiswaAktif > 0 ? (totalHalaman / totalSiswaAktif).toFixed(0) : 0;
            let kecepatanRataRata = 0;
            if(data.length > 0) {
                const firstDate = new Date(Math.min(...data.map(e => new Date(e.created_at))));
                const days = Math.max(1, (new Date() - firstDate) / (1000 * 3600 * 24));
                kecepatanRataRata = (totalHalaman / days).toFixed(0);
            }
            statTotalHalaman.textContent = totalHalaman.toLocaleString('id-ID');
            statRataHalaman.textContent = parseFloat(rataRataHalaman).toLocaleString('id-ID');
            statKecepatan.textContent = parseFloat(kecepatanRataRata).toLocaleString('id-ID');
            
            const classTotals = allProgressData.reduce((acc, d) => {
                if (!d.Siswa) return acc;
                const kelas = d.Siswa.kelas;
                if (!acc[kelas]) acc[kelas] = { totalHalaman: 0, siswa: new Set(), firstDate: new Date(d.created_at) };
                acc[kelas].totalHalaman += d.halaman_dibaca;
                acc[kelas].siswa.add(d.Siswa.id);
                if (new Date(d.created_at) < acc[kelas].firstDate) acc[kelas].firstDate = new Date(d.created_at);
                return acc;
            }, {});
            const maxPages = Math.max(1, ...Object.values(classTotals).map(c => c.totalHalaman));
            classInsightsContainer.innerHTML = '';
            const allDbClasses = [...new Set(allStudentData.map(s => s.kelas))].sort();
            allDbClasses.forEach(kelas => {
                const stats = classTotals[kelas];
                const totalSiswaDiKelas = allStudentData.filter(s => s.kelas === kelas).length;
                if (stats) {
                    const days = Math.max(1, (new Date() - stats.firstDate) / (1000 * 3600 * 24));
                    const pagesPerDay = (stats.totalHalaman / days).toFixed(1);
                    const progressWidth = (stats.totalHalaman / maxPages) * 100;
                    classInsightsContainer.innerHTML += `<div><div class="flex justify-between items-center mb-1"><p class="font-semibold">Kelas ${kelas} <span class="text-sm font-normal text-gray-500">(${totalSiswaDiKelas} siswa)</span></p><span class="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">${pagesPerDay} hal/hari</span></div><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-blue-600 h-2.5 rounded-full" style="width: ${progressWidth}%"></div></div><p class="text-right text-sm text-gray-600 mt-1">${stats.totalHalaman.toLocaleString('id-ID')} halaman</p></div>`;
                } else { classInsightsContainer.innerHTML += `<div><div class="flex justify-between items-center mb-1"><p class="font-semibold">Kelas ${kelas} <span class="text-sm font-normal text-gray-500">(${totalSiswaDiKelas} siswa)</span></p></div><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-gray-400 h-2.5 rounded-full" style="width: 0%"></div></div><p class="text-right text-sm text-gray-600 mt-1">0 halaman</p></div>`; }
            });
        }
        
        function renderProgressTable() {
            const selectedKelas = progressTableFilterKelas.value;
            const startDate = progressTableFilterStartDate.value;
            const endDate = progressTableFilterEndDate.value;
            
            let filteredData = [...allProgressData];

            if (selectedKelas !== 'semua') {
                filteredData = filteredData.filter(p => p.Siswa && p.Siswa.kelas === selectedKelas);
            }
            if (startDate) {
                filteredData = filteredData.filter(p => new Date(p.created_at) >= new Date(startDate));
            }
            if (endDate) {
                const endOfDay = new Date(endDate);
                endOfDay.setHours(23, 59, 59, 999);
                filteredData = filteredData.filter(p => new Date(p.created_at) <= endOfDay);
            }

            teacherTableBody.innerHTML = '';
            const sortedData = filteredData.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
            if (sortedData.length > 0) {
                sortedData.forEach(item => {
                    if (item.Siswa) {
                        teacherTableBody.innerHTML += `<tr class="bg-white border-b hover:bg-gray-50"><td class="px-6 py-4">${new Date(item.created_at).toLocaleString('id-ID', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</td><td class="px-6 py-4 font-medium text-gray-900">${item.Siswa.nama}<br><span class="text-xs bg-gray-200 px-1.5 py-0.5 rounded">${item.Siswa.kelas}</span></td><td class="px-6 py-4">${item.judul_buku}</td><td class="px-6 py-4 text-center"><span class="font-bold">${item.halaman_dibaca} hal</span><br><span class="text-xs text-gray-500">(${item.halaman_awal} → ${item.halaman_akhir})</span></td><td class="px-6 py-4 text-sm text-gray-600">${item.deskripsi}</td></tr>`;
                    }
                });
            } else { teacherTableBody.innerHTML = `<tr><td colspan="5" class="text-center p-8">Tidak ada data untuk filter ini.</td></tr>`; }
        }

        function showStudentManagementTab(tabName) {
            studentListTab.classList.add('hidden');
            addStudentTab.classList.add('hidden');
            importStudentTab.classList.add('hidden');
            reviewsTab.classList.add('hidden');
            studentListTabBtn.classList.remove('active');
            addStudentTabBtn.classList.remove('active');
            importStudentTabBtn.classList.remove('active');
            reviewsTabBtn.classList.remove('active');

            if (tabName === 'list') {
                studentListTab.classList.remove('hidden');
                studentListTabBtn.classList.add('active');
            } else if (tabName === 'add') {
                addStudentTab.classList.remove('hidden');
                addStudentTabBtn.classList.add('active');
            } else if (tabName === 'import') {
                importStudentTab.classList.remove('hidden');
                importStudentTabBtn.classList.add('active');
            } else if (tabName === 'reviews') {
                reviewsTab.classList.remove('hidden');
                reviewsTabBtn.classList.add('active');
            }
        }

        async function handleAddStudentSubmit(e) {
            e.preventDefault();
            const nis = document.getElementById('add-nis').value.trim();
            const nama = document.getElementById('add-nama').value.trim();
            const kelas = document.getElementById('add-kelas').value.trim();
            
            if (!nis || !nama || !kelas) {
                addStudentMessage.textContent = 'Semua field wajib diisi.';
                addStudentMessage.className = 'text-sm text-center text-red-500';
                return;
            }

            const { error } = await supabaseClient.from('Siswa').insert({ nis, nama, kelas, sekolah_id: currentSekolahId });

            if (error) {
                addStudentMessage.textContent = `Gagal menyimpan: ${error.code === '23505' ? 'NIS sudah terdaftar.' : error.message}`;
                addStudentMessage.className = 'text-sm text-center text-red-500';
            } else {
                addStudentMessage.textContent = 'Siswa berhasil ditambahkan!';
                addStudentMessage.className = 'text-sm text-center text-green-500';
                addStudentForm.reset();
                await loadTeacherDashboard();
            }
            setTimeout(() => addStudentMessage.textContent = '', 3000);
        }

        function renderStudentList() {
            const searchTerm = studentListSearch.value.toLowerCase();
            const filteredStudents = allStudentData.filter(s => s.nama.toLowerCase().includes(searchTerm));
            
            studentListTableBody.innerHTML = '';
            if (filteredStudents.length === 0) {
                studentListTableBody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-gray-500">Tidak ada siswa ditemukan.</td></tr>`;
                return;
            }

            filteredStudents.forEach(student => {
                if (editingStudentId === student.id) {
                    studentListTableBody.innerHTML += `
                        <tr class="bg-blue-50">
                            <td class="px-4 py-2"><input type="text" value="${student.nis}" id="edit-nis-${student.id}" class="w-full px-2 py-1 border border-blue-300 rounded-md"></td>
                            <td class="px-4 py-2"><input type="text" value="${student.nama}" id="edit-nama-${student.id}" class="w-full px-2 py-1 border border-blue-300 rounded-md"></td>
                            <td class="px-4 py-2"><input type="text" value="${student.kelas}" id="edit-kelas-${student.id}" class="w-full px-2 py-1 border border-blue-300 rounded-md"></td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button data-id="${student.id}" class="save-student-btn text-green-600 hover:text-green-800"><i class="fas fa-check"></i></button>
                                <button class="cancel-edit-btn text-gray-500 hover:text-gray-700"><i class="fas fa-times"></i></button>
                            </td>
                        </tr>`;
                } else {
                    studentListTableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-2">${student.nis}</td>
                            <td class="px-4 py-2">${student.nama}</td>
                            <td class="px-4 py-2">${student.kelas}</td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button data-id="${student.id}" class="edit-student-btn text-blue-600 hover:text-blue-800"><i class="fas fa-pencil-alt"></i></button>
                                <button data-id="${student.id}" data-nama="${student.nama}" class="delete-student-btn text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>`;
                }
            });
            attachStudentListActionListeners();
        }

        function attachStudentListActionListeners() {
            document.querySelectorAll('.edit-student-btn').forEach(btn => btn.addEventListener('click', (e) => {
                editingStudentId = e.currentTarget.dataset.id;
                renderStudentList();
            }));
            document.querySelectorAll('.cancel-edit-btn').forEach(btn => btn.addEventListener('click', () => {
                editingStudentId = null;
                renderStudentList();
            }));
            document.querySelectorAll('.save-student-btn').forEach(btn => btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                const newNis = document.getElementById(`edit-nis-${id}`).value.trim();
                const newNama = document.getElementById(`edit-nama-${id}`).value.trim();
                const newKelas = document.getElementById(`edit-kelas-${id}`).value.trim();
                if (!newNis || !newNama || !newKelas) return;

                const { error } = await supabaseClient.from('Siswa').update({ nis: newNis, nama: newNama, kelas: newKelas }).eq('id', id);
                if (error) {
                    alert('Gagal memperbarui data: ' + error.message);
                } else {
                    editingStudentId = null;
                    await loadTeacherDashboard();
                }
            }));
            document.querySelectorAll('.delete-student-btn').forEach(btn => btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                const nama = e.currentTarget.dataset.nama;
                if (confirm(`Yakin ingin menghapus siswa "${nama}"?\nSemua data progres membacanya juga akan terhapus.`)) {
                    const { error } = await supabaseClient.from('Siswa').delete().eq('id', id);
                    if (error) {
                        alert('Gagal menghapus siswa: ' + error.message);
                    } else {
                        loadTeacherDashboard();
                    }
                }
            }));
        }

        function downloadCSVTemplate() {
            const headers = "nis,nama,kelas";
            const csvContent = "data:text/csv;charset=utf-8," + headers;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "template_siswa_agubi.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function cleanupImportUI() {
            studentsToImportPreview = [];
            importPreviewContainer.classList.add('hidden');
            importCsvInput.value = '';
        }

        function cancelImportProcess() {
            cleanupImportUI();
            importStatus.textContent = "Proses impor dibatalkan.";
            importStatus.className = 'text-sm mt-2 text-gray-500';
        }

        function renderImportPreview(students) {
            let tableHTML = `<table class="w-full text-sm text-left text-gray-500"><thead class="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" class="px-4 py-2">NIS</th><th scope="col" class="px-4 py-2">Nama</th><th scope="col" class="px-4 py-2">Kelas</th></tr></thead><tbody>`;
            students.forEach(student => {
                tableHTML += `<tr class="bg-white border-b"><td class="px-4 py-2 font-medium text-gray-900">${student.nis}</td><td class="px-4 py-2">${student.nama}</td><td class="px-4 py-2">${student.kelas}</td></tr>`;
            });
            tableHTML += `</tbody></table>`;
            
            importPreviewTable.innerHTML = tableHTML;
            importPreviewContainer.classList.remove('hidden');
            importStatus.textContent = `${students.length} data siswa siap diimpor.`;
            importStatus.className = 'text-sm mt-2 text-blue-600';
        }

        // --- FUNGSI YANG DIPERBAIKI ---
        async function confirmAndImportData() {
            if (studentsToImportPreview.length === 0) {
                importStatus.textContent = "Tidak ada data untuk diimpor.";
                importStatus.className = 'text-sm mt-2 text-red-500';
                return;
            }

            // Tambahkan pengecekan untuk memastikan ID sekolah ada sebelum impor
            if (!currentSekolahId) {
                importStatus.textContent = "Error: Sesi sekolah tidak ditemukan. Silakan logout dan login kembali.";
                importStatus.className = 'text-sm mt-2 text-red-500';
                console.error("Gagal impor karena currentSekolahId bernilai null.");
                return;
            }

            confirmImportBtn.disabled = true;
            confirmImportBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mengimpor...';
            
            // Logika ini sudah benar, setiap siswa akan otomatis ditambahkan sekolah_id
            const dataToImport = studentsToImportPreview.map(s => ({
                ...s, 
                sekolah_id: currentSekolahId
            }));

            const { error } = await supabaseClient
                .from('Siswa')
                .upsert(dataToImport, { onConflict: 'sekolah_id,nis' });

            if (error) {
                importStatus.textContent = `Error saat impor: ${error.message}`;
                importStatus.className = 'text-sm mt-2 text-red-500';
            } else {
                importStatus.textContent = `Berhasil! ${studentsToImportPreview.length} data siswa berhasil diproses. Memuat ulang dasbor...`;
                importStatus.className = 'text-sm mt-2 text-green-600';
                cleanupImportUI();
                setTimeout(loadTeacherDashboard, 2000); 
            }
            confirmImportBtn.disabled = false;
            confirmImportBtn.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Konfirmasi & Impor';
        }
        
        async function handleImportCSV(event) {
            const file = event.target.files[0];
            if (!file) return;

            cleanupImportUI();
            importStatus.textContent = `Membaca file: ${file.name}...`;
            importStatus.className = 'text-sm mt-2 text-blue-600';

            const reader = new FileReader();
            reader.onload = async (e) => {
                const text = e.target.result;
                const lines = text.replace(/^\uFEFF/, '').split(/\r\n|\n/).filter(line => line.trim() !== '');
                
                if (lines.length <= 1) {
                    importStatus.textContent = "Error: File kosong atau hanya berisi header.";
                    importStatus.className = 'text-sm mt-2 text-red-500';
                    return;
                }

                const possibleDelimiters = [',', ';'];
                let delimiter = ',';
                let maxCount = 0;
                possibleDelimiters.forEach(d => {
                    const count = lines[0].split(d).length;
                    if (count > maxCount) { delimiter = d; maxCount = count; }
                });

                const headers = lines[0].split(delimiter).map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
                if (headers[0] !== 'nis' || headers[1] !== 'nama' || headers[2] !== 'kelas') {
                    importStatus.textContent = 'Error: Format header salah. Pastikan kolom adalah: nis,nama,kelas';
                    importStatus.className = 'text-sm mt-2 text-red-500';
                    return;
                }

                const parsedStudents = [];
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(delimiter).map(v => v.replace(/^"|"$/g, '').trim());
                    if (values.length === 3 && values[0]) {
                        parsedStudents.push({
                            nis: values[0].trim(),
                            nama: values[1].trim(),
                            kelas: values[2].trim()
                        });
                    }
                }

                if (parsedStudents.length === 0) {
                    importStatus.textContent = "Tidak ada data siswa yang valid ditemukan di file.";
                    importStatus.className = 'text-sm mt-2 text-yellow-600';
                    return;
                }

                studentsToImportPreview = parsedStudents;
                renderImportPreview(studentsToImportPreview);
            };
            
            reader.onerror = () => {
                 importStatus.textContent = "Gagal membaca file.";
                 importStatus.className = 'text-sm mt-2 text-red-500';
            };

            reader.readAsText(file, 'UTF-8');
        }

        function renderAchievementManagement() {
            achievementList.innerHTML = '';
            awardAchievementSelect.innerHTML = '<option value="">Pilih Achievement</option>';
            allAchievements.forEach(ach => {
                const typeLabel = ach.type === 'auto' ? '[Otomatis]' : '[Manual]';
                achievementList.innerHTML += `
                    <li class="achievement-item-container bg-gray-50 rounded-lg">
                        <div class="flex justify-between items-center text-sm p-2 cursor-pointer achievement-item-header" data-id="${ach.id}">
                            <div>
                                <span class="font-bold">${ach.emoji || ''} ${ach.nama_achievement}</span> 
                                <span class="text-xs text-gray-500">${typeLabel}</span>
                                <p class="text-xs text-gray-600">${ach.kriteria}</p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button data-id="${ach.id}" class="edit-achievement-btn text-blue-500 hover:text-blue-700 z-10 p-1"><i class="fas fa-pencil-alt"></i></button>
                                <button data-id="${ach.id}" class="delete-achievement-btn text-red-500 hover:text-red-700 z-10 p-1"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="expandable-content p-2 border-t border-gray-200" data-recipient-list-id="${ach.id}"></div>
                    </li>`;
                if (ach.type === 'manual') {
                    awardAchievementSelect.innerHTML += `<option value="${ach.id}">${ach.emoji} ${ach.nama_achievement}</option>`;
                }
            });

            populateAwardStudentSelect();

            document.querySelectorAll('.delete-achievement-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const id = parseInt(e.target.closest('button').dataset.id);
                    if (confirm('Yakin ingin menghapus achievement ini? Ini juga akan menghapus pencapaian ini dari semua siswa yang telah menerimanya.')) {
                        const { error } = await supabaseClient.from('Achievements').delete().eq('id', id);
                        if (error) {
                            alert('Gagal menghapus achievement: ' + error.message);
                        } else {
                            loadTeacherDashboard();
                        }
                    }
                });
            });
            
            document.querySelectorAll('.edit-achievement-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseInt(e.target.closest('button').dataset.id);
                    editAchievement(id);
                });
            });
            
            document.querySelectorAll('.achievement-item-header').forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target.closest('button')) return;
                    const id = parseInt(e.currentTarget.dataset.id);
                    const container = e.currentTarget.closest('.achievement-item-container');
                    const recipientList = container.querySelector('.expandable-content');
                    const isShowing = recipientList.classList.contains('show');
                    document.querySelectorAll('.expandable-content.show').forEach(el => {
                        if (el !== recipientList) el.classList.remove('show');
                    });
                    if (!isShowing) showAchievementRecipients(id, recipientList);
                    recipientList.classList.toggle('show');
                });
            });
        }

        function populateAwardStudentSelect() {
            const selectedClass = awardClassSelect.value;
            const searchTerm = awardStudentSearch.value.toLowerCase();
            
            let students = allStudentData;
            if (selectedClass !== 'semua') {
                students = students.filter(s => s.kelas === selectedClass);
            }
            if (searchTerm) {
                students = students.filter(s => s.nama.toLowerCase().includes(searchTerm));
            }
            
            awardStudentSelect.innerHTML = '<option value="">Pilih Siswa</option>';
            students.sort((a,b) => a.nama.localeCompare(b.nama)).forEach(s => {
                awardStudentSelect.innerHTML += `<option value="${s.id}">${s.nama} (${s.kelas})</option>`;
            });
        }
        
        function renderCreateAchievementForm() {
            formAchTitle.textContent = editingAchievementId ? 'Edit Achievement' : 'Buat Achievement Baru';
            if(currentAchievementForm === 'manual') {
                createAchievementForm.innerHTML = `<input type="text" id="achievement-emoji" placeholder="Emoji (cth: ✨)" class="w-full px-3 py-2 border rounded-lg"><input type="text" id="achievement-image-url" placeholder="ATAU URL Gambar (opsional)" class="w-full px-3 py-2 border rounded-lg"><input type="text" id="achievement-name" placeholder="Nama Achievement" class="w-full px-3 py-2 border rounded-lg" required><textarea id="achievement-criteria" placeholder="Kriteria Pencapaian" class="w-full px-3 py-2 border rounded-lg" rows="2" required></textarea><button type="submit" class="w-full bg-green-600 text-white font-bold py-2 rounded-lg">${editingAchievementId ? 'Update' : 'Buat'} Achievement Manual</button>${editingAchievementId ? '<button type="button" id="cancel-edit-btn" class="w-full mt-2 bg-gray-500 text-white font-bold py-2 rounded-lg">Batal</button>' : ''}`;
            } else {
                createAchievementForm.innerHTML = `<input type="text" id="achievement-emoji" placeholder="Emoji (cth: ✨)" class="w-full px-3 py-2 border rounded-lg"><input type="text" id="achievement-image-url" placeholder="ATAU URL Gambar (opsional)" class="w-full px-3 py-2 border rounded-lg"><input type="text" id="achievement-name" placeholder="Nama Achievement" class="w-full px-3 py-2 border rounded-lg" required><select id="achievement-condition-type" class="w-full px-3 py-2 border rounded-lg"><option value="single_book_pages">Halaman dalam 1 Laporan</option><option value="total_pages_overall">Total Halaman Dibaca</option><option value="total_books_finished">Jumlah Buku Selesai</option></select><input type="number" id="achievement-condition-value" placeholder="Nilai (cth: 150)" class="w-full px-3 py-2 border rounded-lg" required><textarea id="achievement-criteria" placeholder="Kriteria Pencapaian" class="w-full px-3 py-2 border rounded-lg" rows="2" required></textarea><button type="submit" class="w-full bg-green-600 text-white font-bold py-2 rounded-lg">${editingAchievementId ? 'Update' : 'Buat'} Achievement Otomatis</button>${editingAchievementId ? '<button type="button" id="cancel-edit-btn" class="w-full mt-2 bg-gray-500 text-white font-bold py-2 rounded-lg">Batal</button>' : ''}`;
            }

            if(editingAchievementId) {
                document.getElementById('cancel-edit-btn').addEventListener('click', cancelEditAchievement);
            }
        }

        function editAchievement(id) {
            editingAchievementId = id;
            const ach = allAchievements.find(a => a.id === id);
            if (!ach) return;

            currentAchievementForm = ach.type;
            if (ach.type === 'manual') {
                manualAchTab.click();
            } else {
                autoAchTab.click();
            }
            
            renderCreateAchievementForm();
            
            document.getElementById('achievement-emoji').value = ach.emoji || '';
            document.getElementById('achievement-image-url').value = ach.gambar_url || '';
            document.getElementById('achievement-name').value = ach.nama_achievement;
            document.getElementById('achievement-criteria').value = ach.kriteria;
            if (ach.type === 'auto') {
                document.getElementById('achievement-condition-type').value = ach.condition_type;
                document.getElementById('achievement-condition-value').value = ach.condition_value;
            }
        }
        
        function cancelEditAchievement() {
            editingAchievementId = null;
            createAchievementForm.reset();
            renderCreateAchievementForm();
        }

        async function checkAndAwardAutomaticAchievements(siswaId, newProgress) {
            const { data: siswaData, error: siswaError } = await supabaseClient.from('Siswa').select('sekolah_id').eq('id', siswaId).single();
            if (siswaError || !siswaData) return;

            const { data: autoAchievements } = await supabaseClient.from('Achievements').select('*').eq('type', 'auto').eq('sekolah_id', siswaData.sekolah_id);
            
            const { data: studentAchievementsData } = await supabaseClient.from('PencapaianSiswa').select('achievement_id').eq('siswa_id', siswaId);
            const studentAchievements = studentAchievementsData.map(p => p.achievement_id);
            const { data: studentTotalProgress } = await supabaseClient.from('ProgresBaca').select('halaman_dibaca, judul_buku, is_selesai').eq('siswa_id', siswaId);
            
            for (const ach of autoAchievements) {
                if (studentAchievements.includes(ach.id)) continue;
                let conditionMet = false;
                if (ach.condition_type === 'single_book_pages') {
                    if (newProgress.halaman_dibaca >= ach.condition_value) conditionMet = true;
                } else if (ach.condition_type === 'total_pages_overall') {
                    const totalPages = studentTotalProgress.reduce((sum, p) => sum + p.halaman_dibaca, 0);
                    if (totalPages >= ach.condition_value) conditionMet = true;
                } else if (ach.condition_type === 'total_books_finished') {
                    const finishedBooks = new Set(studentTotalProgress.filter(p => p.is_selesai).map(p => p.judul_buku));
                    if (finishedBooks.size >= ach.condition_value) conditionMet = true;
                }

                if (conditionMet) {
                    const { data, error } = await supabaseClient.from('PencapaianSiswa').insert({ siswa_id: siswaId, achievement_id: ach.id }).select().single();
                    if (!error && data) {
                        newAchievementToast.innerHTML = `Selamat! Kamu membuka achievement: <strong>${ach.nama_achievement}</strong>`;
                        newAchievementToast.classList.remove('hidden');
                    }
                }
            }
        }

        async function showAchievementRecipients(achievementId, container) {
            container.innerHTML = `<div class="p-2 text-xs text-gray-500">Memuat penerima...</div>`;
            const recipients = allPencapaianSiswa.filter(p => p.achievement_id === achievementId);
            
            container.innerHTML = '';
            if (recipients.length > 0) {
                const groupedByClass = recipients.reduce((acc, p) => {
                    const student = p.Siswa;
                    if(student) (acc[student.kelas] = acc[student.kelas] || []).push({id: p.id, ...student});
                    return acc;
                }, {});

                for (const kelas in groupedByClass) {
                    container.innerHTML += `<h4 class="font-semibold text-sm mt-2">${kelas}</h4>`;
                    const studentList = groupedByClass[kelas].map(s => `<li class="flex justify-between items-center text-xs p-1"><span>${s.nama}</span><button data-id="${s.id}" class="revoke-achievement-btn text-red-400 hover:text-red-600 p-1"><i class="fas fa-times"></i></button></li>`).join('');
                    container.innerHTML += `<ul class="pl-2">${studentList}</ul>`;
                }
                
                container.querySelectorAll('.revoke-achievement-btn').forEach(btn => {
                    btn.addEventListener('click', async e => {
                        e.stopPropagation();
                        const idToRemove = parseInt(e.target.closest('button').dataset.id);
                        if(confirm('Yakin ingin mencabut achievement ini dari siswa?')) {
                            const {error} = await supabaseClient.from('PencapaianSiswa').delete().eq('id', idToRemove);
                            if(error) { alert('Gagal mencabut achievement: ' + error.message); }
                            else {
                                loadTeacherDashboard();
                            }
                        }
                    });
                });
            } else {
                container.innerHTML = `<p class="p-2 text-xs text-gray-500">Belum ada penerima.</p>`;
            }
        }

        function renderReviewList() {
            const selectedKelas = reviewFilterKelas.value;
            const selectedRating = reviewFilterRating.value;

            let filteredReviews = allReviewsData;

            if (selectedKelas !== 'semua') {
                filteredReviews = filteredReviews.filter(r => r.Siswa && r.Siswa.kelas === selectedKelas);
            }
            if (selectedRating !== 'semua') {
                filteredReviews = filteredReviews.filter(r => r.rating === parseInt(selectedRating));
            }

            reviewListContainer.innerHTML = '';
            if (filteredReviews.length === 0) {
                reviewListContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full py-8">Tidak ada ulasan ditemukan untuk filter ini.</p>`;
                return;
            }

            filteredReviews.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).forEach(review => {
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                reviewListContainer.innerHTML += `
                    <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-bold text-lg text-gray-800">${review.judul_buku}</h4>
                                <span class="text-yellow-500 font-bold text-lg" title="${review.rating} bintang">${stars}</span>
                            </div>
                            <button data-review-id="${review.id}" class="delete-review-btn text-gray-400 hover:text-red-600 absolute top-2 right-2 p-2"><i class="fas fa-trash"></i></button>
                        </div>
                        <p class="text-sm text-gray-700 mt-2 mb-3 italic">"${review.ulasan || 'Tidak ada ulasan teks.'}"</p>
                        <div class="text-xs text-right text-gray-500 border-t pt-2">
                            Oleh: <span class="font-semibold">${review.Siswa ? review.Siswa.nama : 'N/A'}</span> 
                            (${review.Siswa ? review.Siswa.kelas : 'N/A'})
                            - ${new Date(review.created_at).toLocaleDateString('id-ID')}
                        </div>
                    </div>
                `;
            });

            document.querySelectorAll('.delete-review-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const reviewId = e.currentTarget.dataset.reviewId;
                    if (confirm('Yakin ingin menghapus ulasan ini secara permanen?')) {
                        const { error } = await supabaseClient.from('UlasanBuku').delete().eq('id', reviewId);
                        if (error) {
                            alert('Gagal menghapus ulasan: ' + error.message);
                        } else {
                            loadTeacherDashboard();
                        }
                    }
                });
            });
        }

        function filterAndRenderPublicReviews() {
            const searchTerm = publicReviewSearch.value.toLowerCase();
            const minRating = parseInt(publicReviewRatingFilter.value);

            let filtered = allPublicReviews;

            if (searchTerm) {
                filtered = filtered.filter(review => review.judul_buku.toLowerCase().includes(searchTerm));
            }

            if (minRating && minRating !== "semua") {
                filtered = filtered.filter(review => review.rating >= minRating);
            }
            
            renderPublicReviews(filtered);
        }

        function renderPublicReviews(reviews, container = publicReviewListContainer) {
            container.innerHTML = '';
            if (reviews.length === 0) {
                container.innerHTML = `<p class="text-center text-gray-500 col-span-full py-8">Tidak ada ulasan buku yang cocok dengan pencarian Anda.</p>`;
                return;
            }
            reviews.forEach(review => {
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                container.innerHTML += `
                    <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex justify-between items-start">
                            <h4 class="font-bold text-lg text-gray-800">${review.judul_buku}</h4>
                            <span class="text-yellow-500 font-bold text-lg" title="${review.rating} bintang">${stars}</span>
                        </div>
                        <p class="text-sm text-gray-700 mt-2 mb-3 italic">"${review.ulasan || 'Tidak ada ulasan teks.'}"</p>
                        <div class="text-xs text-right text-gray-500 border-t pt-2">
                            Oleh: <span class="font-semibold">${review.Siswa ? review.Siswa.nama : 'N/A'}</span> 
                            (${review.Siswa ? review.Siswa.kelas : 'N/A'})
                            - ${new Date(review.created_at).toLocaleDateString('id-ID')}
                        </div>
                    </div>
                `;
            });
        }

        function showDbError() {
            appContainer.innerHTML = `<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-2xl mx-auto"><h2 class="font-bold text-xl mb-2">Kesalahan Database!</h2><p>Pastikan Anda sudah menjalankan semua skrip SQL yang dibutuhkan untuk membuat tabel dan mengatur policies (RLS).</p></div>`;
        }
        
        // --- Event Listeners Umum ---
        function setupEventListeners() {
            // Landing and navigation
            document.getElementById('go-to-school-code-btn').addEventListener('click', () => showView('school-code'));
            document.getElementById('go-to-register-btn').addEventListener('click', () => showView('register'));
            document.getElementById('back-to-landing-1').addEventListener('click', () => showView('landing'));
            document.getElementById('back-to-landing-2').addEventListener('click', () => showView('landing'));
            document.getElementById('go-to-login-from-email').addEventListener('click', () => {
                currentSekolahId = null;
                currentSekolahName = null;
                loginSchoolContext.classList.add('hidden');
                showView('school-code');
            });
            document.getElementById('go-to-teacher-login-btn').addEventListener('click', () => {
                loginSchoolContext.classList.remove('hidden');
                loginSchoolNameSpan.textContent = currentSekolahName;
                showView('login');
            });
            document.getElementById('go-to-student-verification-btn').addEventListener('click', () => {
                showView('student');
                resetStudentVerificationForm();
                populateKelasOptions();
            });
            document.querySelectorAll('.back-to-school-code-btn').forEach(btn => btn.addEventListener('click', () => {
                currentSekolahId = null;
                currentSekolahName = null;
                schoolCodeFormSection.classList.remove('hidden');
                schoolCodeOptionsSection.classList.add('hidden');
                document.getElementById('kode-sekolah').value = '';
                showView('school-code');
            }));
            
            // Forms
            registerForm.addEventListener('submit', handleSignUp);
            createSchoolForm.addEventListener('submit', handleCreateSchool);
            document.getElementById('login-form').addEventListener('submit', handleTeacherLogin);
            document.getElementById('school-code-form').addEventListener('submit', handleSchoolCodeVerification);

            // Student flow
            kelasSelect.addEventListener('change', (e) => loadStudentNames(e.target.value));
            checkDataButton.addEventListener('click', handleStudentVerification);
            isSelesaiCheckbox.addEventListener('change', () => reviewSection.classList.toggle('hidden', !isSelesaiCheckbox.checked));
            
            // Teacher flow
            logoutButton.addEventListener('click', () => supabaseClient.auth.signOut());
            
            // Other event listeners
            logoutStudentButton.addEventListener('click', () => {
                resetStudentVerificationForm();
                populateKelasOptions();
                showView('student');
            });
            reportAgainButton.addEventListener('click', () => {
                studentDashboardSection.classList.add('hidden');
                studentFormContainer.classList.remove('hidden');
                verificationSection.classList.add('hidden');
                progressFormSection.classList.remove('hidden');
                studentNameDisplay.textContent = verifiedName;
                newAchievementToast.classList.add('hidden');
            });

            judulBukuInput.addEventListener('input', () => {
                const searchTerm = judulBukuInput.value.toLowerCase();
                if (searchTerm.length < 1) {
                    bookSuggestionsContainer.classList.add('hidden');
                    return;
                }
                const suggestions = [...myBookTitles].filter(title => title.toLowerCase().includes(searchTerm));
                if (suggestions.length > 0) {
                    bookSuggestionsContainer.innerHTML = suggestions.map(title => `<div class="suggestion-item">${title}</div>`).join('');
                    bookSuggestionsContainer.classList.remove('hidden');
                } else {
                    bookSuggestionsContainer.classList.add('hidden');
                }
            });

            bookSuggestionsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-item')) {
                    judulBukuInput.value = e.target.textContent;
                    bookSuggestionsContainer.classList.add('hidden');
                }
            });

            document.addEventListener('click', (e) => {
                if (!judulBukuInput.contains(e.target) && !bookSuggestionsContainer.contains(e.target)) {
                    bookSuggestionsContainer.classList.add('hidden');
                }
            });

            teacherFilterKelas.addEventListener('change', updateDashboard);
            teacherFilterMonth.addEventListener('change', updateTopPerformers);
            progressTableApplyFilter.addEventListener('click', renderProgressTable);
            progressTableResetFilter.addEventListener('click', () => {
                progressTableFilterKelas.value = 'semua';
                progressTableFilterStartDate.value = '';
                progressTableFilterEndDate.value = '';
                renderProgressTable();
            });

            studentListTabBtn.addEventListener('click', () => showStudentManagementTab('list'));
            addStudentTabBtn.addEventListener('click', () => showStudentManagementTab('add'));
            importStudentTabBtn.addEventListener('click', () => showStudentManagementTab('import'));
            reviewsTabBtn.addEventListener('click', () => showStudentManagementTab('reviews'));
            
            addStudentForm.addEventListener('submit', handleAddStudentSubmit);
            studentListSearch.addEventListener('input', () => renderStudentList());
            
            downloadTemplateBtn.addEventListener('click', downloadCSVTemplate);
            importCsvInput.addEventListener('change', handleImportCSV);
            confirmImportBtn.addEventListener('click', confirmAndImportData);
            cancelImportBtn.addEventListener('click', cancelImportProcess);

            reviewFilterKelas.addEventListener('change', renderReviewList);
            reviewFilterRating.addEventListener('change', renderReviewList);

            manualAchTab.addEventListener('click', () => {
                if (editingAchievementId) return;
                currentAchievementForm = 'manual';
                manualAchTab.classList.add('bg-white', 'shadow', 'text-blue-600', 'font-semibold');
                autoAchTab.classList.remove('bg-white', 'shadow', 'text-blue-600', 'font-semibold');
                autoAchTab.classList.add('text-gray-500');
                renderCreateAchievementForm();
            });
            autoAchTab.addEventListener('click', () => {
                if (editingAchievementId) return;
                currentAchievementForm = 'auto';
                autoAchTab.classList.add('bg-white', 'shadow', 'text-blue-600', 'font-semibold');
                manualAchTab.classList.remove('bg-white', 'shadow', 'text-blue-600', 'font-semibold');
                manualAchTab.classList.add('text-gray-500');
                renderCreateAchievementForm();
            });

            createAchievementForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const achievementData = {
                    emoji: document.getElementById('achievement-emoji').value,
                    gambar_url: document.getElementById('achievement-image-url').value,
                    nama_achievement: document.getElementById('achievement-name').value,
                    kriteria: document.getElementById('achievement-criteria').value,
                    type: currentAchievementForm,
                    sekolah_id: currentSekolahId
                };
                if (currentAchievementForm === 'auto') {
                    achievementData.condition_type = document.getElementById('achievement-condition-type').value;
                    achievementData.condition_value = parseInt(document.getElementById('achievement-condition-value').value);
                }

                if (editingAchievementId) {
                    const { error } = await supabaseClient.from('Achievements').update(achievementData).eq('id', editingAchievementId);
                    if (error) alert(`Gagal update: ${error.message}`);
                } else {
                    const { error } = await supabaseClient.from('Achievements').insert(achievementData);
                    if (error) alert(`Gagal membuat: ${error.message}`);
                }
                
                cancelEditAchievement();
                loadTeacherDashboard();
            });

            awardAchievementForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const siswaId = awardStudentSelect.value;
                const achievementId = parseInt(awardAchievementSelect.value);
                if (!siswaId || !achievementId) {
                    awardMessage.textContent = 'Harap pilih siswa dan achievement.';
                    awardMessage.className = 'text-sm text-center text-red-500';
                    return;
                }
                awardMessage.textContent = 'Memberikan...';
                
                const { error } = await supabaseClient.from('PencapaianSiswa').insert({ siswa_id: siswaId, achievement_id: achievementId });
                if (error) {
                    awardMessage.textContent = 'Gagal: ' + (error.code === '23505' ? 'Siswa sudah punya badge ini.' : error.message);
                    awardMessage.className = 'text-sm text-center text-red-500';
                } else {
                    awardMessage.textContent = 'Achievement berhasil diberikan!';
                    awardMessage.className = 'text-sm text-center text-green-500';
                    awardAchievementForm.reset();
                    loadTeacherDashboard();
                }
                setTimeout(() => awardMessage.textContent = '', 3000);
            });

            awardClassSelect.addEventListener('change', populateAwardStudentSelect);
            awardStudentSearch.addEventListener('input', populateAwardStudentSelect);

            showRecommendationsBtn.addEventListener('click', async () => {
                showView('recommendation');
                publicReviewListContainer.innerHTML = `<div class="col-span-full flex justify-center py-8"><div class="loader"></div></div>`;
                const { data: studentIds, error: studentIdError } = await supabaseClient.from('Siswa').select('id').eq('sekolah_id', currentSekolahId);
                if(studentIdError) {
                    publicReviewListContainer.innerHTML = `<p class="text-center text-red-500 col-span-full">Gagal memuat id siswa.</p>`;
                    return;
                }
                const ids = studentIds.map(s => s.id);

                const { data, error } = await supabaseClient.from('UlasanBuku').select('*, Siswa(nama, kelas)').in('siswa_id', ids).order('created_at', { ascending: false });
                if (error) {
                    publicReviewListContainer.innerHTML = `<p class="text-center text-red-500 col-span-full">Gagal memuat ulasan.</p>`;
                } else {
                    allPublicReviews = data;
                    filterAndRenderPublicReviews();
                }
            });
            backToMainBtn.addEventListener('click', () => {
                if (verifiedSiswaId) {
                    showView('student');
                    loadStudentDashboard();
                } else {
                    showView('school-code');
                }
            });
            publicReviewSearch.addEventListener('input', filterAndRenderPublicReviews);
            publicReviewRatingFilter.addEventListener('change', filterAndRenderPublicReviews);
        }

        // --- Inisialisasi Aplikasi ---
        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            initializeApp();
        });
