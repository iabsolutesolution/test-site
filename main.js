document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll and Header Effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px -10px rgba(2,12,27,0.7)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });

    // Logo Scroll to Top
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('rfq-modal');
    const openBtns = document.querySelectorAll('.open-rfq');
    const closeBtn = document.querySelector('.close-modal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = btn.getAttribute('data-product');
            const subjectInput = document.getElementById('subject');
            if (product && subjectInput) {
                subjectInput.value = `RFQ for: ${product}`;
            }
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Form Submission (EmailJS Integration)
    const form = document.getElementById('rfq-form');
    const successMsg = document.getElementById('rfq-success');
    const modalContent = document.querySelector('.modal-content');

    // Helper to toggle views
    function showSuccessView() {
        form.style.display = 'none';
        modalContent.querySelector('h3').style.display = 'none';
        modalContent.querySelector('.modal-desc').style.display = 'none';
        successMsg.style.display = 'block';
    }

    function resetModalView() {
        form.style.display = 'block';
        modalContent.querySelector('h3').style.display = 'block';
        modalContent.querySelector('.modal-desc').style.display = 'block';
        successMsg.style.display = 'none';
        form.reset();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        // Visual Feedback - Loading
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Prepare parameters matching your EmailJS template variables
        // Recommended Template Variables: {{name}}, {{company}}, {{email}}, {{phone}}, {{subject}}, {{message}}
        const templateParams = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            reply_to: 'kjpark@iabsolute.net' // Custom Reply-To configuration
        };

        // Send Email
        // Service ID: service_74fzx52, Template ID: template_ipkem4r
        emailjs.send('service_74fzx52', 'template_ipkem4r', templateParams)
            .then(() => {
                showSuccessView();
            }, (error) => {
                console.error('FAILED...', error);
                alert('전송에 실패했습니다. 잠시 후 다시 시도해주시거나, 고객센터로 연락 부탁드립니다.\nError: ' + JSON.stringify(error));
            })
            .finally(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });

    // Close logic including success button
    const successCloseBtn = document.querySelector('.close-modal-btn');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(resetModalView, 300); // Reset after transition
        });
    }

    // Reset form when closing via X or outside click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(resetModalView, 300);
    });

    // ... existing ...

    // Privacy Policy Modal Logic
    const privacyModal = document.getElementById('privacy-modal');
    const openPrivacyBtn = document.getElementById('open-privacy');
    const closePrivacyBtn = document.getElementById('close-privacy');
    const privacyConfirmBtn = document.getElementById('privacy-confirm');

    if (openPrivacyBtn) {
        openPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
        });
    }

    function closePrivacy() {
        privacyModal.classList.remove('active');
    }

    if (closePrivacyBtn) closePrivacyBtn.addEventListener('click', closePrivacy);
    if (privacyConfirmBtn) privacyConfirmBtn.addEventListener('click', closePrivacy);

    // Update global window click to close privacy modal too
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(resetModalView, 300);
        }
        if (e.target === privacyModal) {
            privacyModal.classList.remove('active');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileBtn = document.querySelector('.close-mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    if (closeMobileBtn) {
        closeMobileBtn.addEventListener('click', toggleMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Internationalization (I18n) Logic ---
    const translations = {
        ko: {
            nav_about: "회사 소개",
            nav_products: "제품 소개",
            nav_trust: "핵심 경쟁력",
            nav_location: "오시는 길",
            nav_contact: "문의하기",
            hero_subtitle: "Premium Industrial Components",
            hero_title: "산업용 고무와 자석의 모든 것,<br>앱솔루트솔루션",
            hero_desc: "최적의 고무 소재부터 고성능 마그넷까지,<br>귀사에 필요한 수입 자재를 빠르고 정확하게 공급합니다.",
            btn_rfq: "견적 문의하기",
            about_title: "Beyond Distribution,<br>We are your Partner.",
            about_p1: "앱솔루트솔루션은 단순 유통을 넘어, 제조사의 파트너로서 최적의 부품 솔루션을 제안합니다.",
            about_p2: "중국 현지 공장 직거래를 통한 <strong>단가 경쟁력</strong>과 국내 상시 재고 운영을 통한 <strong>빠른 납기</strong>를 보장합니다. 귀사의 제품 퀄리티를 한 단계 높여드립니다.",
            stat_qc_title: "Quality Control",
            stat_qc_desc: "100% 현지 전수 검사",
            stat_delivery_title: "Fast Delivery",
            stat_delivery_desc: "국내 재고 보유",
            products_title: "Our Solutions",
            prod_rubber_title: "정밀 고무 솔루션",
            prod_rubber_desc: "무전기 및 IT 기기용 초정밀 방수/방진 부품",
            prod_rubber_item1: "키패드 (Silicone/Rubber)",
            prod_rubber_item2: "O-링 (O-Ring)",
            prod_rubber_item3: "안테나 캡",
            prod_rubber_item4: "실리콘 패킹 & 가스켓",
            btn_bulk_rfq: "대량 구매 견적 요청",
            prod_magnet_title: "산업용 자석 솔루션",
            prod_magnet_desc: "고성능 네오디뮴 및 맞춤형 산업 자석",
            prod_magnet_item1: "네오디뮴 (NdFeB)",
            prod_magnet_item2: "내열용 SmCo 자석",
            prod_magnet_item3: "페라이트 (Ferrite)",
            prod_magnet_item4: "고무 자석 시트",
            trust_title: "Why Absolute Solution?",
            trust_qc_title: "현지 품질 관리",
            trust_qc_desc: "출고 전 <strong>Gauss</strong> 및 치수 전수 검사를 통해 불량률 0%에 도전합니다.",
            trust_sample_title: "샘플 신속 대응",
            trust_sample_desc: "벤더사 승인을 위한 샘플을 <strong>무상/신속</strong>하게 지원하여 개발 기간을 단축합니다.",
            modal_rfq_title: "견적 요청 (RFQ)",
            modal_rfq_desc: "대량 구매 및 커스텀 사양 문의를 남겨주시면 담당자가 24시간 이내에 연락드립니다.",
            process_title: "Work Process",
            process_step1_title: "Inquiry (문의)",
            process_step1_desc: "제품 및 사양 문의 접수",
            process_step2_title: "Quotation (견적)",
            process_step2_desc: "사양 검토 및 상세 견적",
            process_step3_title: "Sample & QC",
            process_step3_desc: "샘플 승인 및 품질 검사",
            process_step4_title: "Delivery (납품)",
            process_step4_desc: "안전하고 빠른 납품",
            btn_brochure: "회사소개서 다운로드 (Download Brochure)",
            btn_catalog: "제품 카탈로그 보기",
            btn_brochure_pdf: "회사소개서 다운로드 (PDF)",
            modal_contact_note: "* 대량 구매 및 커스텀 사양 문의 환영",
            // About & History
            about_history_p1: "2015년 9월 설립된 앱솔루트 솔루션은 인적자원관리 사업을 시작으로 다양한 분야에서 납품 및 개발을 진행해 온 기업입니다.",
            about_history_p2: "당사의 주요 제품으로는 네오디뮴(NdFeB, SmCo, Ferrite 등), Shield Magnet, Magnet Application을 비롯한 다양한 자석 제품을 제작 및 공급합니다.",
            about_history_p3: "또한, 차량 및 외장재 부품용으로 다양한 라바(합성고무) 제품을 제공합니다. 자동차 전기 시스템의 절연 보호를 위한 라바 제품을 공급하여 시스템의 안전성과 안정적인 작동을 보장합니다.",
            about_history_p4: "이 외에도 주차 인식 센서, 광분배기 등 다양한 산업 분야의 제품을 개발 및 공급하고 있습니다.",
            hist_2023_feb: "애경화장품 화장품 CASE용 네오디늄자석 공급",
            hist_2022_oct: "인프라일렉 완구 조립용 네오디늄 자석 공급",
            hist_2022_jun: "㈜효성전기, 케이엠티, 일오삼코리아 Motor용 자석공급",
            hist_2022_feb: "NINGBO SUNNY WEALTH 과 한국영업소 업무 협약",
            hist_2020_oct: "백금티엔에이 차량용 브라켓용 자석공급 개시",
            hist_2020_mar: "153코리아(모토 종합 회사) 모터용 자석 공급개시",
            hist_2018_dec: "ANSON Magnet(중국) 의 한국지사 업무 협약<br>삼성 Folder Phone용(B4,B5~) 자석 공급, 애플 Book cover용 자석공급",
            hist_2017_mar: "자석전문화사 ㈜노바텍 경영컨설팅 체결 (~2018.9)",
            hist_2015_sep: "㈜앱솔루트솔루션 설립",
            history_section_title: "회사 개요 및 연혁",
            about_section_title: "앱솔루트 솔루션 소개"
        },
        en: {
            nav_about: "About",
            nav_products: "Products",
            nav_trust: "Why Us",
            nav_location: "Location",
            nav_contact: "Contact",
            hero_subtitle: "Premium Industrial Components",
            hero_title: "Absolute Solution,<br>Precision Perfected.",
            hero_desc: "Your premier distribution partner for precision rubber and industrial magnets.<br>We promise **absolute quality** through local QC in China.",
            btn_rfq: "Request Quotation",
            about_title: "Beyond Distribution,<br>We are your Partner.",
            about_p1: "Absolute Solution proposes optimal component solutions as a manufacturing partner, going beyond simple distribution.",
            about_p2: "We guarantee **price competitiveness** through direct dealings with Chinese factories and **fast delivery** via domestic stock. We elevate your product quality.",
            stat_qc_title: "Quality Control",
            stat_qc_desc: "100% Full Inspection",
            stat_delivery_title: "Fast Delivery",
            stat_delivery_desc: "In-Stock Inventory",
            products_title: "Our Solutions",
            prod_rubber_title: "Precision Rubber",
            prod_rubber_desc: "High-precision waterproof/dustproof parts for radios & IT devices",
            prod_rubber_item1: "Keypad (Silicone/Rubber)",
            prod_rubber_item2: "O-Ring",
            prod_rubber_item3: "Antenna Cap",
            prod_rubber_item4: "Silicone Packing & Gasket",
            btn_bulk_rfq: "Request Bulk Quote",
            prod_magnet_title: "Industrial Magnets",
            prod_magnet_desc: "High-performance Neodymium and custom industrial magnets",
            prod_magnet_item1: "Neodymium (NdFeB)",
            prod_magnet_item2: "SmCo Magnet (Heat Resistant)",
            prod_magnet_item3: "Ferrite",
            prod_magnet_item4: "Rubber Magnet Sheet",
            trust_title: "Why Absolute Solution?",
            trust_qc_title: "Local QC",
            trust_qc_desc: "We challenge 0% defect rates through full <strong>Gauss</strong> and dimension inspections before shipment.",
            trust_sample_title: "Quick Sampling",
            trust_sample_desc: "We support <strong>free/fast</strong> samples for vendor approval to shorten development time.",
            modal_rfq_title: "Request for Quote (RFQ)",
            modal_rfq_desc: "Please provide details for bulk purchase or custom specifications. We will contact you within 24 hours.",
            process_title: "Work Process",
            process_step1_title: "Inquiry",
            process_step1_desc: "Product & Spec Inquiry",
            process_step2_title: "Quotation",
            process_step2_desc: "Spec Review & Quote",
            process_step3_title: "Sample & QC",
            process_step3_desc: "Sample Approval & QC",
            process_step4_title: "Delivery",
            process_step4_desc: "Safe & Fast Delivery",
            btn_brochure: "Download Brochure",
            btn_catalog: "View Product Catalog",
            btn_brochure_pdf: "Download Brochure (PDF)",
            modal_contact_note: "* Bulk purchase and custom specifications inquiries welcome",
            // About & History
            about_history_p1: "Founded in Sep 2015, Absolute Solution has expanded from HR management to component supply and development.",
            about_history_p2: "Our main products include Neodymium (NdFeB, SmCo, Ferrite), Shield Magnets, and various magnet applications.",
            about_history_p3: "We also provide precision rubber components for automotive and exterior parts, ensuring system safety and stability.",
            about_history_p4: "Additionally, we develop and supply products for various industries such as parking sensors and optical splitters.",
            hist_2023_feb: "Supplied Neodymium magnets for Aekyung Cosmetics cases",
            hist_2022_oct: "Supplied Neodymium magnets for InfraElec toy assembly",
            hist_2022_jun: "Supplied Motor magnets to Hyoseong Electric, KMT, 153 Korea",
            hist_2022_feb: "Business agreement with NINGBO SUNNY WEALTH Korea office",
            hist_2020_oct: "Started supplying magnets for Platinum T&A vehicle brackets",
            hist_2020_mar: "Started supplying motor magnets to 153 Korea",
            hist_2018_dec: "Business agreement with ANSON Magnet (China) Korea branch<br>Samsung Folder Phone & Apple Book cover magnet supply",
            hist_2017_mar: "Consulting agreement with Novatech (~2018.9)",
            hist_2015_sep: "Established Absolute Solution Co., Ltd.",
            history_section_title: "Company Overview & History",
            about_section_title: "About Absolute Solution"
        },
        zh: {
            nav_about: "关于我们",
            nav_products: "产品介绍",
            nav_trust: "核心竞争力",
            nav_location: "公司位置",
            nav_contact: "联系我们",
            hero_subtitle: "Premium Industrial Components",
            hero_title: "精密零件的完美答案，<br>Absolute Solution",
            hero_desc: "无线对讲机用精密橡胶及工业磁铁的专业分销合作伙伴。<br>通过中国当地QC承诺**绝对品质**。",
            btn_rfq: "询价",
            about_title: "Beyond Distribution,<br>We are your Partner.",
            about_p1: "Absolute Solution 超越单纯的分销，作为制造商的合作伙伴提出最佳的零部件解决方案。",
            about_p2: "通过与中国工厂的直接交易保证**价格竞争力**，并通过国内常备库存保证**快速交货**。我们将提升贵司的产品质量。",
            stat_qc_title: "质量控制",
            stat_qc_desc: "100% 全数检查",
            stat_delivery_title: "快速交货",
            stat_delivery_desc: "保有国内库存",
            products_title: "我们的解决方案",
            prod_rubber_title: "精密橡胶解决方案",
            prod_rubber_desc: "无线对讲机及IT设备用超精密防水/防尘部件",
            prod_rubber_item1: "按键 (硅胶/橡胶)",
            prod_rubber_item2: "O型圈 (O-Ring)",
            prod_rubber_item3: "天线帽",
            prod_rubber_item4: "硅胶密封圈 & 垫片",
            btn_bulk_rfq: "批量购买询价",
            prod_magnet_title: "工业磁铁解决方案",
            prod_magnet_desc: "高性能钕铁硼及定制工业磁铁",
            prod_magnet_item1: "钕铁硼 (NdFeB)",
            prod_magnet_item2: "耐热用钐钴磁铁",
            prod_magnet_item3: "铁氧体 (Ferrite)",
            prod_magnet_item4: "橡胶磁片",
            trust_title: "为何选择我们?",
            trust_qc_title: "当地质量管理",
            trust_qc_desc: "通过出厂前的全数 **Gauss** 及尺寸检查，挑战 0% 不良率。",
            trust_sample_title: "样品快速响应",
            trust_sample_desc: "为了供应商认证，我们**免费/快速**提供样品，缩短开发周期。",
            modal_rfq_title: "询价 (RFQ)",
            modal_rfq_desc: "请留下批量购买及定制规格咨询，负责人将在24小时内联系您。",
            process_title: "工作流程",
            process_step1_title: "咨询 (Inquiry)",
            process_step1_desc: "产品及规格咨询",
            process_step2_title: "报价 (Quotation)",
            process_step2_desc: "规格审查及报价",
            process_step3_title: "样品 & QC",
            process_step3_desc: "样品确认及质量控制",
            process_step4_title: "交货 (Delivery)",
            process_step4_desc: "安全快速交货",
            btn_brochure: "下载公司介绍 (Download Brochure)",
            btn_catalog: "查看产品目录",
            btn_brochure_pdf: "下载公司介绍 (PDF)",
            modal_contact_note: "* 欢迎批量购买及定制规格咨询",
            // About & History
            about_history_p1: "Absolute Solution 成立于 2015 年 9 月，从人力资源管理业务起步，现已扩展至零部件供应和开发领域。",
            about_history_p2: "我们的主要产品包括钕铁硼（NdFeB、SmCo、Ferrite）、屏蔽磁铁、磁铁应用以及各种磁铁产品的制造和供应。",
            about_history_p3: "此外，我们还提供用于汽车和外部部件的精密橡胶组件，确保系统的安全性和稳定性。",
            about_history_p4: "另外，我们还开发并供应停车传感器、光分路器等各行业的产品。",
            hist_2023_feb: "向爱敬化妆品供应钕磁铁（化妆品外壳用）",
            hist_2022_oct: "向 InfraElec 供应钕磁铁（玩具组装用）",
            hist_2022_jun: "向晓星电机、KMT、153 Korea 供应电机用磁铁",
            hist_2022_feb: "与 NINGBO SUNNY WEALTH 韩国办事处签订业务协议",
            hist_2020_oct: "开始向 Platinum T&A 供应车辆支架用磁铁",
            hist_2020_mar: "开始向 153 Korea 供应电机用磁铁",
            hist_2018_dec: "与 ANSON Magnet (中国) 签订韩国分公司业务协议<br>供应三星折叠手机 (B4, B5~) 及苹果书套用磁铁",
            hist_2017_mar: "与磁铁专业公司 Novatech 签订经营咨询协议 (~2018.9)",
            hist_2015_sep: "成立 Absolute Solution Co., Ltd.",
            history_section_title: "公司概况及历史",
            about_section_title: "关于 Absolute Solution"
        }
    };

    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // If the translations contain HTML tags (like <strong> or <br>), use innerHTML
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Initialize Language
    // Check local storage or default to 'ko'
    const savedLang = 'ko'; // Defaulting to KO as requested
    updateLanguage(savedLang);

    // Event Listeners for Language Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    // Product Detail Modal Logic
    // Product Detail Modal Logic - Hardcoded Content as requested
    // Product Detail Modal Logic - Multilingual Support Restored
    const productData = {
        magnet: {
            img: 'assets/magnets.png',
            ko: {
                title: "고성능 네오디뮴 자석",
                items: [["등급", "표준 N35~N52 / 내열용 M, H, SH 시리즈"], ["코팅", "니켈(Ni-Cu-Ni), 아연, 에폭시, 금"], ["형상", "원형, 사각, 링형, 도면 기반 맞춤 제작"], ["적용", "전기차 모터, 센서, 스피커, 자력선별기"]]
            },
            en: {
                title: "Neodymium Magnets",
                items: [["Grade", "Standard N35~N52 / High Temp M, H, SH"], ["Coating", "Ni-Cu-Ni, Zinc, Epoxy, Gold"], ["Shapes", "Disc, Block, Ring, Custom per drawing"], ["Apps", "EV Motors, Sensors, Speakers"]]
            },
            zh: {
                title: "高性能钕铁硼磁铁",
                items: [["牌号", "标准 N35~N52 / 耐高温 M, H, SH"], ["镀层", "镍铜镍, 蓝白锌, 环氧树脂, 镀金"], ["形状", "圆形, 方形, 环形, 按图定制"], ["应用", "驱动电机, 传感器, 扬声器"]]
            }
        },
        rubber: {
            img: 'assets/rubber.png',
            ko: {
                title: "정밀 성형 고무 부품",
                items: [["재질", "EPDM(실외/차량), NBR(내유성), 실리콘(식품/의료)"], ["제품", "그로밋, 오링, 오일씰, 댐퍼, 부츠"], ["역량", "2D/3D 도면 기반 정밀 금형 설계 및 양산"]]
            },
            en: {
                title: "Custom Molded Rubber",
                items: [["Material", "EPDM(Auto), NBR(Oil), Silicone(Medical)"], ["Products", "Grommets, O-Rings, Oil Seals, Dampers"], ["Capability", "Custom molding based on 2D/3D drawings"]]
            },
            zh: {
                title: "精密模压橡胶组件",
                items: [["材质", "EPDM(汽车), NBR(耐油), 硅胶(医疗)"], ["产品", "护套, O型圈, 油封, 减震器"], ["能力", "基于2D/3D图纸的定制生产"]]
            }
        }
    };

    const productModal = document.getElementById('product-modal');
    const closeProductBtn = document.getElementById('close-product');
    const productTriggers = document.querySelectorAll('.product-detail-trigger');

    // Elements to populate
    const modalImg = document.getElementById('modal-product-img');
    const modalTitle = document.getElementById('modal-product-title');
    const modalDesc = document.getElementById('modal-product-desc'); // Currently generic or hidden based on design, but we can repurpose or clear it.
    const modalSpecs = document.getElementById('modal-product-specs');

    function openProductModal(type) {
        const product = productData[type];
        if (!product) return;

        modalImg.src = product.img;

        // Get Language
        const currentLang = document.documentElement.lang || 'ko';
        // Fallback to 'en' if specific lang data missing, but we have all 3.
        const content = product[currentLang] || product['en'];

        modalTitle.innerText = content.title;
        modalDesc.style.display = 'none'; // Hide generic description for now as we have detailed specs

        // Specs List - Grid Layout
        modalSpecs.innerHTML = '';
        content.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'spec-grid-row'; // New class for grid layout
            // item[0] is Label, item[1] is Value
            li.innerHTML = `<span class="spec-label">${item[0]}</span> <span class="spec-value">${item[1]}</span>`;
            modalSpecs.appendChild(li);
        });

        // Update RFQ Button in Modal
        const modalRfqBtn = document.getElementById('modal-rfq-btn');
        if (modalRfqBtn) {
            modalRfqBtn.setAttribute('data-product', content.title);
        }

        productModal.classList.add('active');
    }

    productTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const type = trigger.getAttribute('data-type');
            openProductModal(type);
        });
    });

    if (closeProductBtn) {
        closeProductBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }

    const modalRfqBtnGlobal = document.getElementById('modal-rfq-btn');
    if (modalRfqBtnGlobal) {
        modalRfqBtnGlobal.addEventListener('click', () => {
            productModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
        }
    });



    // Scroll To Top Button Logic
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.onscroll = function () { scrollFunction() };
    }

    function scrollFunction() {
        if (!scrollTopBtn) return;
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }




    // 2. Motion: Scroll Reveal Fade In
    const sections = document.querySelectorAll('.section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => revealObserver.observe(sec));


    // 4. Function: Email Auto Copy & Toast
    const footerEmailValues = document.querySelectorAll('footer a[href^="mailto:"]');
    footerEmailValues.forEach(emailLink => {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = emailLink.innerText;
            navigator.clipboard.writeText(emailText).then(() => {
                showToast("Email copied to clipboard!");
            });
        });
    });

    function showToast(message) {
        // Create toast if not exists
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.className = "show";
        setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    }

});
