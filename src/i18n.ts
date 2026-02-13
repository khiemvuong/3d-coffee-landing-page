import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  vi: {
    translation: {
      nav: {
        home: 'Trang chủ',
        menu: 'Thực đơn',
        about: 'Về chúng tôi',
        contact: 'Liên hệ',
        order: 'Đặt hàng',
      },
      hero: {
        subtitle: 'TRẢI NGHIỆM CÀ PHÊ ĐỈNH CAO',
        title: 'Hương Vị Từ Thiên Nhiên',
        description:
          'Khám phá bộ sưu tập cà phê thượng hạng, được tuyển chọn từ những vùng trồng danh tiếng nhất thế giới. Mỗi giọt cà phê là một hành trình.',
        cta: 'Khám phá ngay',
        secondary: 'Xem thực đơn',
      },
      features: {
        title: 'Tại sao chọn chúng tôi',
        subtitle: 'Cam kết chất lượng từ nguồn gốc đến tách cà phê',
        origin: {
          title: 'Nguồn gốc thuần khiết',
          desc: 'Hạt cà phê được chọn lọc từ những trang trại hữu cơ tốt nhất Đắk Lắk, Lâm Đồng và thế giới.',
        },
        roast: {
          title: 'Rang thủ công',
          desc: 'Mỗi mẻ rang được thực hiện bởi nghệ nhân với hơn 20 năm kinh nghiệm, đảm bảo hương vị hoàn hảo.',
        },
        brew: {
          title: 'Pha chế nghệ thuật',
          desc: 'Đội ngũ barista được đào tạo chuyên nghiệp, mang đến trải nghiệm cà phê đẳng cấp.',
        },
        fresh: {
          title: 'Luôn tươi mới',
          desc: 'Cà phê được rang và giao trong vòng 48 giờ, đảm bảo hương vị tươi ngon nhất.',
        },
      },
      menu: {
        title: 'Thực đơn nổi bật',
        subtitle: 'Những tác phẩm cà phê được yêu thích nhất',
        items: {
          espresso: {
            name: 'Espresso Đặc Biệt',
            desc: 'Đậm đà, mạnh mẽ với crema vàng óng',
            price: '55.000₫',
          },
          cappuccino: {
            name: 'Cappuccino Ý',
            desc: 'Hòa quyện espresso với bọt sữa mịn màng',
            price: '65.000₫',
          },
          pourover: {
            name: 'Pour Over Đắk Lắk',
            desc: 'Cà phê specialty từ cao nguyên Việt Nam',
            price: '75.000₫',
          },
          coldbrew: {
            name: 'Cold Brew 24h',
            desc: 'Ủ lạnh 24 giờ, vị thanh mát tự nhiên',
            price: '70.000₫',
          },
          latte: {
            name: 'Latte Art Caramel',
            desc: 'Latte nghệ thuật với caramel thượng hạng',
            price: '72.000₫',
          },
          vietnamese: {
            name: 'Cà Phê Sữa Đá',
            desc: 'Huyền thoại cà phê Việt Nam truyền thống',
            price: '45.000₫',
          },
        },
      },
      about: {
        title: 'Câu chuyện của chúng tôi',
        subtitle: 'Hành trình từ hạt cà phê đến tách cà phê hoàn hảo',
        description:
          'Brew & Beyond ra đời từ niềm đam mê cà phê thuần khiết. Chúng tôi tin rằng mỗi tách cà phê không chỉ là thức uống, mà là một trải nghiệm kết nối con người với thiên nhiên. Từ việc chọn lọc hạt cà phê tốt nhất, rang thủ công tỉ mỉ đến pha chế nghệ thuật - mọi bước đều được thực hiện với tâm huyết.',
        stats: {
          years: 'Năm kinh nghiệm',
          customers: 'Khách hàng',
          beans: 'Loại hạt',
          cups: 'Tách mỗi ngày',
        },
      },
      footer: {
        tagline: 'Mỗi tách cà phê là một hành trình khám phá hương vị.',
        quickLinks: 'Liên kết',
        hours: 'Giờ mở cửa',
        hoursDetail: 'Thứ 2 - Chủ nhật: 7:00 - 22:00',
        contact: 'Liên hệ',
        rights: 'Bảo lưu mọi quyền.',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        menu: 'Menu',
        about: 'About',
        contact: 'Contact',
        order: 'Order Now',
      },
      hero: {
        subtitle: 'PREMIUM COFFEE EXPERIENCE',
        title: 'Flavors From Nature',
        description:
          'Discover our premium coffee collection, curated from the world\'s most renowned growing regions. Every drop is a journey.',
        cta: 'Explore Now',
        secondary: 'View Menu',
      },
      features: {
        title: 'Why Choose Us',
        subtitle: 'Quality commitment from origin to cup',
        origin: {
          title: 'Pure Origins',
          desc: 'Beans selected from the finest organic farms in Dak Lak, Lam Dong, and worldwide.',
        },
        roast: {
          title: 'Artisan Roasting',
          desc: 'Each batch is roasted by craftsmen with over 20 years of experience, ensuring perfect flavor.',
        },
        brew: {
          title: 'Artful Brewing',
          desc: 'Professionally trained barista team, delivering a world-class coffee experience.',
        },
        fresh: {
          title: 'Always Fresh',
          desc: 'Coffee roasted and delivered within 48 hours, ensuring the freshest taste.',
        },
      },
      menu: {
        title: 'Featured Menu',
        subtitle: 'Our most beloved coffee creations',
        items: {
          espresso: {
            name: 'Signature Espresso',
            desc: 'Bold and intense with golden crema',
            price: '$2.50',
          },
          cappuccino: {
            name: 'Italian Cappuccino',
            desc: 'Espresso blended with silky milk foam',
            price: '$3.00',
          },
          pourover: {
            name: 'Dak Lak Pour Over',
            desc: 'Specialty coffee from Vietnamese highlands',
            price: '$3.50',
          },
          coldbrew: {
            name: '24h Cold Brew',
            desc: '24-hour cold extraction, naturally smooth',
            price: '$3.20',
          },
          latte: {
            name: 'Caramel Latte Art',
            desc: 'Art latte with premium caramel',
            price: '$3.30',
          },
          vietnamese: {
            name: 'Vietnamese Iced Coffee',
            desc: 'The legendary traditional Vietnamese coffee',
            price: '$2.00',
          },
        },
      },
      about: {
        title: 'Our Story',
        subtitle: 'The journey from bean to perfect cup',
        description:
          'Brew & Beyond was born from a pure passion for coffee. We believe every cup is not just a drink, but an experience connecting people with nature. From selecting the finest beans, meticulous hand-roasting to artful brewing - every step is done with heart.',
        stats: {
          years: 'Years Experience',
          customers: 'Customers',
          beans: 'Bean Varieties',
          cups: 'Cups Daily',
        },
      },
      footer: {
        tagline: 'Every cup of coffee is a journey of flavor discovery.',
        quickLinks: 'Quick Links',
        hours: 'Opening Hours',
        hoursDetail: 'Mon - Sun: 7:00 AM - 10:00 PM',
        contact: 'Contact',
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
