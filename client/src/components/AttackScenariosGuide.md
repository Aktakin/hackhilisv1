# 🎯 Attack Scenarios Guide

## How to Start an Attack

### Step 1: Navigate to Attack Scenario
1. Click the **"Attack"** icon (crosshairs) in the left sidebar
2. Or navigate to `/attack` route

### Step 2: Discover Devices
1. Click one of the scan buttons:
   - **"Scan All"** - Scans Bluetooth, WiFi, and Network
   - **"Scan Bluetooth"** - Bluetooth devices only
   - **"Scan WiFi"** - WiFi-connected devices
   - **"Scan Network"** - Network devices

2. Wait 3 seconds for scan to complete

3. Review discovered devices:
   - Device name and type
   - OS version
   - Security level (1-10)
   - Connection method (Bluetooth/WiFi/Network)
   - MAC/IP address
   - Signal strength
   - Battery level

### Step 3: Select Target
1. Click on a device card to select it
2. Click **"Attack Device"** button
3. Screen splits into two sides:
   - **Left**: Your device + terminal
   - **Right**: Target device + terminal

---

## 🚀 Attack Scenarios

### Scenario 1: Basic Device Exploitation
**Target**: Low security devices (Security 3-5)
**Method**: Direct exploit

**Steps**:
1. In the **target device terminal** (right side), type:
   ```
   exploit shell
   ```
2. Wait for exploit to complete
3. If successful, device status changes to "COMPROMISED"
4. You now have shell access

**Success Rate**: High (70-90% on low security devices)

---

### Scenario 2: Bluetooth Exploitation
**Target**: Bluetooth-enabled devices
**Method**: Bluetooth vulnerability exploit

**Steps**:
1. In **your terminal** (left side), scan for Bluetooth:
   ```
   bt scan
   ```
2. List discovered devices:
   ```
   bt list
   ```
3. Attempt Bluetooth exploit:
   ```
   bt exploit AA:BB:CC:DD:EE:01
   ```
   (Replace with target device MAC address)

4. If successful, gain access to target device

**Success Rate**: Medium (50-70% depending on security)

---

### Scenario 3: Network-Based Attack
**Target**: Devices on same network
**Method**: IP-based exploitation

**Steps**:
1. In **your terminal**, identify target IP:
   ```
   hack-device 192.168.1.105
   ```
   (Replace with target device IP)

2. System scans for vulnerabilities:
   - Open ports
   - Weak authentication
   - Outdated libraries

3. Exploits found vulnerabilities automatically

**Success Rate**: Medium-High (60-80%)

---

### Scenario 4: PIN/Password Cracking
**Target**: Locked devices
**Method**: Brute force attack

**Steps**:
1. In **target device terminal**, attempt PIN crack:
   ```
   crack-pin
   ```
2. System tries combinations (may take time)
3. If successful, device unlocks

**Success Rate**: Low (30% - device may lock after attempts)

---

### Scenario 5: Multi-Stage Attack (Advanced)
**Target**: High security devices (Security 7-10)
**Method**: Combination of techniques

**Steps**:
1. **Reconnaissance** (Your terminal):
   ```
   adb devices
   phone info
   ```

2. **Initial Access** (Target terminal):
   ```
   exploit shell
   ```

3. **Persistence** (Target terminal):
   ```
   exploit backdoor
   ```

4. **Data Extraction** (Target terminal):
   ```
   exploit contacts
   exploit photos
   exploit files
   ```

**Success Rate**: Low-Medium (30-50% on high security)

---

## 📋 Available Attack Commands

### In Your Terminal (Left Side):
- `bt scan` - Scan for Bluetooth devices
- `bt list` - List discovered Bluetooth devices
- `bt exploit <mac>` - Exploit Bluetooth device
- `wifi scan` - Scan WiFi networks
- `wifi connect <ssid>` - Connect to WiFi
- `hack-device <ip>` - Attack device via IP
- `adb devices` - List connected devices
- `adb shell` - Enter Android shell

### In Target Terminal (Right Side):
- `exploit shell` - Gain root shell access
- `exploit backdoor` - Install persistent backdoor
- `exploit keylogger` - Install keylogger
- `exploit camera` - Access camera remotely
- `exploit mic` - Access microphone
- `exploit sms` - Intercept SMS messages
- `exploit location` - Track device location
- `exploit contacts` - Extract contacts
- `exploit photos` - Download all photos
- `exploit files` - Access file system
- `crack-pin` - Brute force PIN
- `hack` - Generic hack command
- `gain-access` - Attempt to gain access

---

## 🎮 Attack Tips

### 1. **Security Level Matters**
- **Low Security (1-4)**: Easy targets, high success rate
- **Medium Security (5-7)**: Moderate difficulty
- **High Security (8-10)**: Hard targets, may require multiple attempts

### 2. **OS Version Affects Difficulty**
- **Android 9-10 (API 28-29)**: Easier to exploit
- **Android 11-12 (API 30-31)**: Medium difficulty
- **Android 12L+ (API 32+)**: Hard to exploit

### 3. **Connection Method**
- **Bluetooth**: Good for nearby devices
- **WiFi**: Network-based attacks
- **Network**: Direct IP attacks

### 4. **Multi-Command Attacks**
Combine multiple commands for better success:
```
exploit shell
exploit backdoor
exploit contacts
```

### 5. **Check Device Status**
- Green "COMPROMISED" = Success
- Red "SECURED" = Still protected
- Yellow "VULNERABLE" = Easier target

---

## 🔍 Example Attack Flow

### Quick Attack (Low Security Device):
```
1. Navigate to /attack
2. Click "Scan All"
3. Select device with Security 3-5
4. Click "Attack Device"
5. In target terminal: exploit shell
6. Wait for "COMPROMISED" status
7. Extract data: exploit contacts
```

### Advanced Attack (High Security Device):
```
1. Navigate to /attack
2. Click "Scan Bluetooth"
3. Select device with Security 8
4. Click "Attack Device"
5. Your terminal: bt exploit <mac>
6. Target terminal: exploit shell
7. If failed, try: hack-device <ip>
8. Install persistence: exploit backdoor
9. Extract data: exploit photos, exploit files
```

---

## ⚠️ Important Notes

1. **Educational Purpose**: All commands are fictional and for game purposes
2. **Real-World**: Educational popups explain real alternatives
3. **Success Rates**: Based on device security level
4. **Multiple Attempts**: You can try multiple times
5. **Device Status**: Updates in real-time when compromised

---

## 🎯 Quick Reference

| Command | Location | Purpose | Success Rate |
|---------|----------|---------|--------------|
| `exploit shell` | Target | Gain access | 30-90% |
| `bt exploit <mac>` | Your | Bluetooth attack | 50-70% |
| `hack-device <ip>` | Your | Network attack | 60-80% |
| `crack-pin` | Target | Unlock device | 30% |
| `exploit backdoor` | Target | Persistence | 40-60% |
| `exploit contacts` | Target | Extract data | 70-90% |

---

**Happy Hacking! 🎮**



