import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  vi: {
    translation: {
      nav: {
        home: 'Trang chủ',
        origin: 'Nguồn cội',
        menu: 'Danh mục',
        about: 'Gia phả',
        contact: 'Thư tín',
        order: 'Đặt hàng',
      },
      hero: {
        subtitle: 'TINH HOA CÀ PHÊ THƯỢNG ĐỈNH',
        title: 'Vương Quốc Của Hương Vị',
        description:
          'Kính mời quý ngài thưởng lãm bộ sưu tập cà phê trứ danh, được tuyển chọn từ những vùng đất huyền thoại nhất hoàn cầu. Mỗi giọt cà phê là một thiên sử thi của hương thơm và vị giác.',
        cta: 'Khám phá ngay',
        secondary: 'Xem danh mục',
      },
      features: {
        title: 'Vì sao nên chọn chúng tôi',
        subtitle: 'Cam kết tinh hoa từ nguồn cội đến từng giọt cà phê quý tộc',
        origin: {
          title: 'Nguồn gốc thuần khiết',
          desc: 'Hạt cà phê được chọn lọc kỹ lưỡng từ những trang trại hữu cơ danh giá nhất Đắk Lắk, Lâm Đồng và khắp năm châu.',
        },
        roast: {
          title: 'Rang nghệ thuật thủ công',
          desc: 'Mỗi mẻ rang là một kiệt tác, được đúc kết bởi nghệ nhân với hơn hai thập kỷ tinh luyện tay nghề.',
        },
        brew: {
          title: 'Pha chế đại sư',
          desc: 'Đội ngũ barista uyên bác, được rèn luyện từ những học viện danh tiếng, mang đến trải nghiệm cà phê đế vương.',
        },
        fresh: {
          title: 'Tươi mới tuyệt đối',
          desc: 'Cà phê được rang và chuyển giao trong vòng 48 giờ, giữ trọn tinh túy và hương sắc nguyên bản.',
        },
      },
      menu: {
        title: 'Danh Mục Trứ Danh',
        subtitle: 'Những kiệt tác cà phê được sủng ái nhất',
        items: {
          espresso: {
            name: 'Espresso Signature',
            desc: 'Đậm đà, tinh tế với lớp crema vàng óng rực rỡ',
            price: '55.000₫',
          },
          cappuccino: {
            name: 'Cappuccino Hoàng Gia',
            desc: 'Espresso hòa quyện cùng bọt sữa lụa Ý tuyệt mỹ',
            price: '65.000₫',
          },
          pourover: {
            name: 'Pour Over Speciality',
            desc: 'Cà phê đặc sản từ những vùng cao nguyên trứ danh',
            price: '75.000₫',
          },
          coldbrew: {
            name: 'Cold Brew Nguyên Bản',
            desc: 'Ủ lạnh suốt 24 giờ, cho vị thanh nhẹ tự nhiên tinh khiết',
            price: '70.000₫',
          },
          latte: {
            name: 'Caramel Macchiato',
            desc: 'Sự kết hợp hoàn hảo giữa Espresso và sốt Caramel thượng hạng',
            price: '72.000₫',
          },
          vietnamese: {
            name: 'Phin Sữa Đá Di Sản',
            desc: 'Hương vị cà phê Phin đậm nét văn hóa Việt Nam',
            price: '45.000₫',
          },
        },
      },
      about: {
        title: 'Gia Phả Của Chúng Tôi',
        subtitle: 'Hành trình vĩ đại từ hạt cà phê hoang dã đến tách cà phê hoàn mỹ',
        description:
          'Brew & Beyond khởi sinh từ ngọn lửa đam mê cà phê thuần khiết và bất diệt. Chúng tôi tin tưởng sâu sắc rằng mỗi tách cà phê không chỉ là thức uống — đó là một nghi thức thiêng liêng kết nối con người với đất trời và thiên nhiên. Từ việc chọn lọc những hạt cà phê trứ danh nhất, rang thủ công với tâm huyết vô biên, đến pha chế với nghệ thuật điêu luyện — mỗi bước đều là một chương trong bản trường ca của hương vị.',
        stats: {
          years: 'Năm kinh nghiệm',
          customers: 'Khách quý',
          beans: 'Giống hạt quý',
          cups: 'Tách mỗi ngày',
        },
      },
      footer: {
        tagline: 'Mỗi tách cà phê là một thiên sử thi của hương thơm và vị giác.',
        quickLinks: 'Liên kết',
        hours: 'Giờ phục vụ',
        hoursDetail: 'Thứ 2 - Chủ nhật: 7:00 - 22:00',
        contact: 'Thư tín',
        rights: 'Bảo lưu mọi quyền.',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Residence',
        origin: 'Terroir',
        menu: 'Repertoire',
        about: 'Lineage',
        contact: 'Correspondence',
        order: 'Commission',
      },
      hero: {
        subtitle: 'A SOVEREIGN COFFEE INSTITUTION',
        title: 'The Celestial Elixir',
        description:
          'We humbly present our distinguished collection of the world\'s most exquisite coffees, procured from legendary terroirs of unparalleled renown. Each drop is a grand odyssey through aroma, body, and the sublime artistry of nature herself.',
        cta: 'Embark Upon Discovery',
        secondary: 'Peruse the Repertoire',
      },
      features: {
        title: 'The Pillars of Our Distinction',
        subtitle: 'An unwavering covenant of excellence, from sacred origin to gilded cup',
        origin: {
          title: 'Sovereign Origins',
          desc: 'Beans of impeccable pedigree, hand-selected from the most illustrious organic estates across Dak Lak, Lam Dong, and the four corners of the earth.',
        },
        roast: {
          title: 'The Artisan\'s Fire',
          desc: 'Each batch is a masterwork, tempered by the knowing hand of master roasters whose craft spans more than two distinguished decades.',
        },
        brew: {
          title: 'The Grand Ceremony',
          desc: 'Our esteemed baristas, schooled in the highest traditions of the craft, perform each brewing as a hallowed ritual of devotion and precision.',
        },
        fresh: {
          title: 'Perpetual Freshness',
          desc: 'Roasted and dispatched within eight-and-forty hours, preserving every whisper of character and aromatic grandeur in its most pristine form.',
        },
      },
      menu: {
        title: 'The Distinguished Repertoire',
        subtitle: 'Our most celebrated and revered compositions',
        items: {
          espresso: {
            name: 'Signature Espresso',
            desc: 'Powerful and refined, crowned with a brilliant golden crema',
            price: '$2.50',
          },
          cappuccino: {
            name: 'Cappuccino Reale',
            desc: 'Espresso in harmonious union with clouds of Florentine milk silk',
            price: '$3.00',
          },
          pourover: {
            name: 'Speciality Pour Over',
            desc: 'A curated single-origin treasure from renowned highland estates',
            price: '$3.50',
          },
          coldbrew: {
            name: 'Ancestral Cold Brew',
            desc: 'Patiently steeped for four-and-twenty hours for a pure, light finish',
            price: '$3.20',
          },
          latte: {
            name: 'Caramel Macchiato',
            desc: 'The perfect marriage of Espresso and premium amber caramel',
            price: '$3.30',
          },
          vietnamese: {
            name: 'Artisan Phin Milk Coffee',
            desc: 'The immortal soul of traditional Vietnamese coffee culture',
            price: '$2.00',
          },
        },
      },
      about: {
        title: 'Our Noble Lineage',
        subtitle: 'The grand passage from wild bean to the cup of perfection',
        description:
          'Brew & Beyond was conceived from an undying and profound passion for the purest expression of coffee. We hold the deepest conviction that every cup transcends mere refreshment — it is a sacred communion between the human spirit and the magnificence of the natural world. From the meticulous selection of the most distinguished beans, through the time-honoured art of hand-roasting, to the ceremonial precision of brewing — each endeavour is a verse in our eternal ode to flavour.',
        stats: {
          years: 'Years of Heritage',
          customers: 'Distinguished Patrons',
          beans: 'Noble Varietals',
          cups: 'Cups Served Daily',
        },
      },
      footer: {
        tagline: 'Every cup is a grand odyssey through the boundless realms of flavour.',
        quickLinks: 'Quick Passages',
        hours: 'Hours of Audience',
        hoursDetail: 'Mon - Sun: 7:00 AM - 10:00 PM',
        contact: 'Correspondence',
        rights: 'All rights reserved.',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
