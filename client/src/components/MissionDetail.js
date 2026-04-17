import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaLaptop,
  FaNetworkWired,
  FaTerminal,
  FaCrosshairs,
  FaCheckCircle
} from 'react-icons/fa';

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 48px;
  min-height: 70vh;
`;

const BackRow = styled.div`
  margin-bottom: 20px;
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8b949e;
  font-size: 0.9rem;
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    color: #00ff41;
  }
`;

const Hero = styled.header`
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
`;

const Eyebrow = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6e7681;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.75rem;
  color: #00ff41;
  margin: 0 0 12px;
  text-shadow: 0 0 14px rgba(0, 255, 65, 0.25);
  line-height: 1.25;
`;

const Lead = styled.p`
  color: #c9d1d9;
  font-size: 1.02rem;
  line-height: 1.6;
  margin: 0;
`;

const Disclaimer = styled.p`
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 8px;
  background: rgba(255, 170, 0, 0.08);
  border: 1px solid rgba(255, 170, 0, 0.25);
  color: #e3b341;
  font-size: 0.85rem;
  line-height: 1.5;
`;

const Section = styled.section`
  margin-bottom: 28px;
`;

const SectionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.05rem;
  color: #58a6ff;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Body = styled.div`
  color: #adbac7;
  font-size: 0.92rem;
  line-height: 1.65;

  p {
    margin: 0 0 12px;
  }
  ul,
  ol {
    margin: 0 0 12px;
    padding-left: 1.35rem;
  }
  li {
    margin-bottom: 8px;
  }
`;

const StepCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(22, 27, 34, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%);
  border: 1px solid rgba(240, 246, 252, 0.1);
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 12px;
`;

const StepNum = styled.span`
  display: inline-block;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  color: #00ff41;
  margin-bottom: 6px;
`;

const StepHeading = styled.h3`
  font-size: 0.95rem;
  color: #e6edf3;
  margin: 0 0 8px;
  font-weight: 600;
`;

const CodeBlock = styled.pre`
  margin: 10px 0 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: #0d1117;
  border: 1px solid rgba(88, 166, 255, 0.2);
  color: #7ee787;
  font-family: 'Share Tech Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  line-height: 1.45;
  overflow-x: auto;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 255, 65, 0.15);
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.88rem;
  color: #0d1117;
  background: linear-gradient(135deg, #3fb950 0%, #00ff41 100%);
  box-shadow: 0 4px 20px rgba(0, 255, 65, 0.25);
  &:hover {
    filter: brightness(1.06);
  }
`;

const GhostBtn = styled.button`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid rgba(240, 246, 252, 0.2);
  background: transparent;
  color: #adbac7;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    border-color: #00ff41;
    color: #00ff41;
  }
`;

const ComingSoonBox = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6e7681;
  font-size: 1.05rem;
`;

function Mission1Content({ onStart }) {
  const navigate = useNavigate();
  const handleStart = () => {
    if (typeof onStart === 'function') {
      onStart(1);
      return;
    }
    navigate('/phone?device=laptop&mission=1');
  };
  const handleBackToList = () => {
    navigate('/missions');
  };

  return (
    <>
      <Hero>
        <Eyebrow>Mission 1 · Authorized training scenario</Eyebrow>
        <Title>MitM on public WiFi — protect, then attack</Title>
        <Lead>
          Your squad’s <strong>team router is down or unstable</strong>. You cannot rely on it for this
          operation. You must join the coffee shop’s public network <strong>CafeFreeNet</strong> to reach
          simulated targets — but public WiFi cuts both ways. You will <strong>recon your situation</strong> in
          the device workspace, <strong>harden this laptop</strong> in the terminal (Phase 1), then{' '}
          <strong>perform the authorized MitM chain</strong> (Phase 2) and prove capture.
        </Lead>
        <Disclaimer>
          Simulation only. Use these techniques only in environments where you have explicit written permission.
          Story and tools are fake; behavior teaches real concepts.
        </Disclaimer>
      </Hero>

      <Section>
        <SectionTitle>
          <FaNetworkWired aria-hidden />
          Part A — Find the situation (device workspace)
        </SectionTitle>
        <Body>
          <p>
            Open the <strong>Phone</strong> workspace (main game phone UI). Use the <strong>device strip</strong>{' '}
            at the top to switch devices — same place you manage your kit.
          </p>
          <ol>
            <li>
              <strong>Router</strong> — Check your team router. In this mission it represents why you cannot stay
              on your usual link (offline / fault). Confirms you need another path to the internet.
            </li>
            <li>
              <strong>Internet</strong> — See how connectivity is modeled (Wi‑Fi vs provider). You are moving to{' '}
              <strong>public WiFi</strong> for this op.
            </li>
            <li>
              <strong>Laptop</strong> — This is where Mission 1 runs: Kali-style desktop +{' '}
              <strong>Terminal</strong> for Phase 1 hardening and Phase 2 attack commands.
            </li>
          </ol>
          <p>
            You do not “fix” the router in-game to win; you <strong>acknowledge it</strong> and proceed via{' '}
            <strong>CafeFreeNet</strong> on the laptop.
          </p>
        </Body>
      </Section>

      <Section>
        <SectionTitle>
          <FaTerminal aria-hidden />
          Part B — Phase 1: Harden on CafeFreeNet (terminal)
        </SectionTitle>
        <Body>
          <p>
            On the <strong>Laptop</strong>, open <strong>Terminal</strong>. Run the checklist (order can be
            flexible; the game tracks each step). Type <code style={{ color: '#7ee787' }}>mission status</code> or{' '}
            <code style={{ color: '#7ee787' }}>help</code> inside the terminal anytime.
          </p>
        </Body>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <StepNum>01</StepNum>
          <StepHeading>Join the public SSID</StepHeading>
          <Body>
            <p>Connect to the coffee shop network:</p>
          </Body>
          <CodeBlock>nmcli dev wifi connect CafeFreeNet</CodeBlock>
        </StepCard>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StepNum>02</StepNum>
          <StepHeading>VPN tunnel (encrypt your traffic)</StepHeading>
          <Body>
            <p>Install client and bring up your provider config as a daemon:</p>
          </Body>
          <CodeBlock>
            {`sudo apt install openvpn
openvpn --config your_vpn.ovpn --daemon`}
          </CodeBlock>
        </StepCard>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StepNum>03</StepNum>
          <StepHeading>Firewall & fail-closed outbound</StepHeading>
          <Body>
            <p>UFW on; default deny inbound; allow VPN egress; then DNS out and OUTPUT DROP (simulated):</p>
          </Body>
          <CodeBlock>
            {`sudo ufw enable
sudo ufw default deny incoming
sudo ufw allow out 1194/udp
sudo iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
sudo iptables -A OUTPUT -j DROP`}
          </CodeBlock>
        </StepCard>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StepNum>04</StepNum>
          <StepHeading>No accidental routing for others</StepHeading>
          <CodeBlock>sudo sysctl net.ipv4.ip_forward=0</CodeBlock>
        </StepCard>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <StepNum>05</StepNum>
          <StepHeading>DNS integrity (unbound)</StepHeading>
          <CodeBlock>
            {`sudo apt install unbound
sudo systemctl restart unbound`}
          </CodeBlock>
        </StepCard>

        <StepCard initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StepNum>06</StepNum>
          <StepHeading>MAC rotation & audit / kill switch</StepHeading>
          <CodeBlock>
            {`sudo macchanger -r wlan0
protonvpn-cli ks
# or:  history > protected.log`}
          </CodeBlock>
        </StepCard>

        <Body>
          <p>
            Verify with <code style={{ color: '#7ee787' }}>curl ipinfo.io/ip</code>,{' '}
            <code style={{ color: '#7ee787' }}>ps aux | grep openvpn</code>, and the in-game checklist until Phase 1
            shows <strong>complete</strong>.
          </p>
        </Body>
      </Section>

      <Section>
        <SectionTitle>
          <FaCrosshairs aria-hidden />
          Part C — Phase 2: Authorized MitM (after Phase 1)
        </SectionTitle>
        <Body>
          <p>When Phase 1 is complete, the sim unlocks attack tooling. Typical chain:</p>
          <ul>
            <li>Install attack packages (aircrack-ng, hostapd, dnsmasq, iptables) — see terminal help.</li>
            <li>Monitor / rogue AP / DHCP / forwarding / NAT as prompted by the scenario.</li>
            <li>
              <strong>bettercap</strong> → <strong>arp.spoof on</strong> → <strong>net.sniff on</strong> →{' '}
              <strong>view captured</strong>.
            </li>
          </ul>
          <p>
            Complete the mission when you have <strong>hardened first</strong> and then <strong>captured traffic</strong>{' '}
            in the simulation.
          </p>
        </Body>
      </Section>

      <Section>
        <SectionTitle>
          <FaCheckCircle aria-hidden />
          What “done” looks like
        </SectionTitle>
        <Body>
          <ul>
            <li>You used the <strong>device workspace</strong> (Router / Internet / Laptop) to orient.</li>
            <li>Terminal shows <strong>Phase 1</strong> checklist complete, then you ran the <strong>Phase 2</strong> chain.</li>
            <li>Mission completion fires after capture/sniff criteria in the laptop sim (see terminal feedback).</li>
          </ul>
        </Body>
      </Section>

      <Actions>
        <PrimaryBtn type="button" onClick={handleStart}>
          <FaLaptop aria-hidden />
          Open laptop & start Mission 1
        </PrimaryBtn>
        <GhostBtn type="button" onClick={handleBackToList}>
          Back to list
        </GhostBtn>
      </Actions>
    </>
  );
}

const MissionDetail = ({ missionId: missionIdProp, onBack, onStart }) => {
  const params = useParams();
  const navigate = useNavigate();
  const routeId = missionIdProp != null ? missionIdProp : params.missionId;
  const id = parseInt(routeId, 10);

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    navigate('/missions');
  };

  if (Number.isNaN(id) || id < 1 || id > 30) {
    return (
      <Page>
        <BackRow>
          <BackLink type="button" onClick={handleBack}>
            <FaArrowLeft aria-hidden />
            Missions
          </BackLink>
        </BackRow>
        <ComingSoonBox>Invalid mission.</ComingSoonBox>
      </Page>
    );
  }

  if (id !== 1) {
    return (
      <Page>
        <BackRow>
          <BackLink type="button" onClick={handleBack}>
            <FaArrowLeft aria-hidden />
            Missions
          </BackLink>
        </BackRow>
        <Hero>
          <Eyebrow>Mission {id}</Eyebrow>
          <Title>Coming soon</Title>
          <Lead>This scenario is not available yet. Check back later.</Lead>
        </Hero>
        <Actions>
          <GhostBtn type="button" onClick={handleBack}>
            Go back
          </GhostBtn>
        </Actions>
      </Page>
    );
  }

  return (
    <Page>
      <BackRow>
        <BackLink type="button" onClick={handleBack}>
          <FaArrowLeft aria-hidden />
          All missions
        </BackLink>
      </BackRow>
      <Mission1Content onStart={onStart} />
    </Page>
  );
};

export default MissionDetail;
