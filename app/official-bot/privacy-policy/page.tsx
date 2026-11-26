import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { CustomLink } from "@/components/ui/customlink";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/official-bot/privacy-policy");

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-8 space-y-3">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-3 pl-6">{children}</ul>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export default function BotPrivacyPolicy() {
  return (
    <main className="page-container pt-6 pb-2 md:pt-12">
      <header className="max-w-3xl">
        <h1 className="text-4xl leading-tight font-black tracking-tight underline decoration-primary decoration-3 underline-offset-10 md:text-6xl">
          r/IGCSE Bot Privacy Policy
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">
          Last Updated: November 15, 2026
        </p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Welcome to r/IGCSE Bot ("the Bot", "we", "us", or "our"). This
          Privacy Policy describes how we handle information when you interact
          with the publicly hosted instance of r/IGCSE Bot on Discord, including
          in the{" "}
          <CustomLink href="https://discord.com/invite/igcse">
            r/IGCSE Discord Community
          </CustomLink>{" "}
          and other servers using the Bot.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          By using the Bot, you agree to the collection and use of information
          in accordance with this policy.
        </p>
      </header>

      <Separator className="my-10 max-w-3xl" />

      <article className="max-w-3xl">
        <Section title="1. Information We Collect">
          <p>
            We only collect information necessary to provide the Bot's core
            features—such as peer study help, community moderation, and support
            communications.
          </p>

          <SubSection title="A. Discord Identifiers">
            <p>
              To identify users and server contexts across Discord, we process:
            </p>
            <List>
              <li>
                <B>Discord User IDs:</B> Used to associate reputation points,
                moderation records, and command interactions with your Discord
                account.
              </li>
              <li>
                <B>Server and Channel IDs:</B> Used to route commands, apply
                server settings, and deliver features to the correct channels.
              </li>
            </List>
          </SubSection>

          <SubSection title="B. Message Content and Temporary Interaction Data">
            <List>
              <li>
                <B>Reputation Message Excerpts:</B> When reputation is awarded
                (e.g., when a user thanks someone for academic help), the Bot
                temporarily collects recent messages sent in that channel
                between the helper and requester (within the preceding 10
                minutes) along with any attachment links. This data is
                collected solely to evaluate the helpfulness and authenticity of
                the response.
              </li>
              <li>
                <B>Support Messages (Modmail):</B> When you send a direct
                message (DM) to the Bot to contact server staff, the message
                content, attachments, and user ID are forwarded to private staff
                channels in your selected server to facilitate support.
              </li>
              <li>
                <B>Anonymous Confessions:</B> When you submit a confession, the
                message text is delivered to server moderators for review and
                publication. To protect your identity, your User ID is converted
                into an irreversible, one-way cryptographic hash. Your actual
                Discord identity is never displayed on approved confessions.
              </li>
              <li>
                <B>Community Submissions:</B> Information you voluntarily
                provide through commands, such as server applications, feedback,
                and interactive study quiz answers.
              </li>
              <li>
                <B>Moderation Records:</B> If moderation action is taken within
                a server, we record the infraction type (e.g., warning,
                timeout, kick, ban), the reason provided, timestamps, and
                moderator notes to assist staff in maintaining server safety.
              </li>
            </List>
          </SubSection>
        </Section>

        <Section title="2. Local AI Model Processing">
          <p>
            To evaluate the quality of study help and detect reputation
            manipulation, messages may be analyzed by an AI model.
          </p>
          <List>
            <li>
              <B>Locally Run:</B> All AI processing is performed strictly
              through a locally running AI model hosted directly on our own
              infrastructure.
            </li>
            <li>
              <B>No Third-Party Sharing:</B> Message data processed by the AI
              model is never sent to external third parties.
            </li>
            <li>
              <B>No AI Training:</B> Your messages and personal data are never
              used to train, retrain, or fine-tune any AI or machine learning
              models. Processing is strictly used for real-time evaluation.
            </li>
          </List>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>
            We use the collected information solely for legitimate community and
            operational purposes:
          </p>
          <List>
            <li>
              Operating the academic reputation system and maintaining community
              leaderboards.
            </li>
            <li>
              Reviewing and verifying the authenticity and quality of study
              assistance.
            </li>
            <li>
              Providing moderation logging, rule enforcement, and antispam
              protection for server staff.
            </li>
            <li>
              Routing user inquiries and support requests between members and
              moderators via Modmail.
            </li>
            <li>
              Publishing anonymous community confessions while preventing system
              abuse.
            </li>
            <li>
              Managing server configurations, role assignments, and automated
              informational responses.
            </li>
          </List>
          <p>
            <B>
              We do not sell, rent, monetize, or use your data for advertising,
              profiling, or tracking.
            </B>
          </p>
        </Section>

        <Section title="4. Data Retention and Deletion">
          <List>
            <li>
              <B>Reputation Message Excerpts:</B> All conversation messages and
              attachment URLs stored for reputation verification are
              automatically and permanently deleted within six (6) hours by an
              automated background script.
            </li>
            <li>
              <B>Confession Verification Data:</B> Temporary verification tokens
              associated with pending confessions automatically expire and are
              purged after 3 days (72 hours). Confession ban records store only
              one-way irreversible hashes, never plaintext user IDs.
            </li>
            <li>
              <B>Reputation Scores:</B> Total reputation points and high-level
              transaction summaries are retained to display leaderboard
              standings and user milestones.
            </li>
            <li>
              <B>Moderation History:</B> Infraction logs (warnings, timeouts,
              kicks, bans) and moderator notes are stored permanently to protect
              community safety and enforce rules. Moderation history will never
              be deleted to maintain server conduct.
            </li>
            <li>
              <B>Modmail Communications:</B> Support messages remain accessible
              to server moderators within staff channels according to
              individual server retention practices.
            </li>
          </List>
        </Section>

        <Section title="5. Data Security">
          <p>
            We implement reasonable technical and organizational precautions to
            protect your data:
          </p>
          <List>
            <li>
              <B>Short-Lived Storage:</B> Detailed message excerpts are purged
              within hours, minimizing data retention.
            </li>
            <li>
              <B>Access Controls:</B> Moderation history and configuration
              commands are restricted to authorized server staff using Discord's
              permission system.
            </li>
            <li>
              <B>Secured Environments:</B> All databases and application
              instances are hosted within secure, access-restricted server
              environments.
            </li>
          </List>
        </Section>

        <Section title="6. Third-Party Services">
          <p>
            The Bot operates on the Discord platform. Your interactions with
            Discord are subject to the{" "}
            <CustomLink href="https://discord.com/privacy">
              Discord Privacy Policy
            </CustomLink>{" "}
            and{" "}
            <CustomLink href="https://discord.com/terms">
              Discord Terms of Service
            </CustomLink>
            .
          </p>
          <p>
            Except for standard platform interactions with Discord, we do not
            share, sell, or disclose your personal information to third parties,
            unless required to comply with valid legal processes.
          </p>
        </Section>

        <Section title="7. Your Rights and Data Deletion">
          <p>You have control over your data:</p>
          <List>
            <li>
              <B>Access and Review:</B> You can view your public reputation and
              leaderboard rankings at any time using the Bot's commands.
            </li>
            <li>
              <B>Requesting Data Deletion:</B> You may request the deletion of
              your personal data (such as your reputation points and related
              profile records) by emailing us at{" "}
              <CustomLink href="mailto:cosmin@r-igcse.com">
                cosmin@r-igcse.com
              </CustomLink>
              ,{" "}
              <CustomLink href="mailto:igcseresources.1@gmail.com">
                igcseresources.1@gmail.com
              </CustomLink>
              , or by opening a Modmail ticket in our Discord server. Please
              provide your Discord User ID so we can identify your records.
            </li>
            <li>
              <B>Permanent Moderation Records:</B> Please note that moderation
              history (including warnings, timeouts, kicks, bans, and moderator
              notes) will never be deleted in order to maintain server conduct,
              enforce rules, and protect community members.
            </li>
            <li>
              <B>Opting Out:</B> You can choose not to use optional features
              such as Modmail, Confessions, or reputation interactions. Server
              administrators can also disable reputation logging in specific
              channels or remove the Bot from their server at any time.
            </li>
            <li>
              <B>Message Processing Opt-Out:</B> You can use the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                /optout
              </code>{" "}
              command to stop the Bot from processing any messages you send. Use{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                /optout action:Opt in
              </code>{" "}
              to reverse this at any time.
            </li>
          </List>
        </Section>

        <Section title="8. Age Requirements">
          <p>
            In accordance with Discord's Terms of Service and applicable privacy
            regulations, the Bot is intended for users who meet the minimum age
            requirement for Discord in their jurisdiction (13 years or older).
            We do not knowingly collect personal data from children under the
            legal age.
          </p>
        </Section>

        <Section title="9. Updates to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated "Last Updated" date. We
            encourage you to review this policy periodically.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have questions, concerns, or data deletion requests regarding
            this Privacy Policy, please contact us through any of the
            following:
          </p>
          <List>
            <li>
              <B>Email:</B>{" "}
              <CustomLink href="mailto:cosmin@r-igcse.com">
                cosmin@r-igcse.com
              </CustomLink>
            </li>
            <li>
              <B>Email:</B>{" "}
              <CustomLink href="mailto:igcseresources.1@gmail.com">
                igcseresources.1@gmail.com
              </CustomLink>
            </li>
            <li>
              <B>Discord:</B> Join the{" "}
              <CustomLink href="https://discord.com/invite/igcse">
                r/IGCSE Discord Community
              </CustomLink>{" "}
              and open a Modmail ticket.
            </li>
            <li>
              <B>Website:</B>{" "}
              <CustomLink href="https://www.r-igcse.com">
                https://www.r-igcse.com
              </CustomLink>
            </li>
          </List>
        </Section>
      </article>
    </main>
  );
}