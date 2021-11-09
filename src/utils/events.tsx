import { Endpoints } from "@octokit/types"
import EventBadge from "../EventBadge/EventBadge"
import { GoComment, GoDiffRemoved, GoEye, GoFlame, GoGitBranch, GoRepoForked, GoRepoPush, GoStar, GoTag, GoUnverified } from "react-icons/go"
import { actorURL } from "./actor"

interface IEventInfo {
    header: JSX.Element,
    badge: JSX.Element
}

type EventType = Endpoints["GET /events"]["response"]["data"][0];

export default function eventInfo(event: EventType) : IEventInfo | null {
    const actor = actorElement(event)
    const repo = repoElement(event)
    const ref = <b>{(event.payload as any).ref} ({(event.payload as any).ref_type})</b>
    if(event.type === "CommitCommentEvent") {
        const commitId = (event.payload.comment as any).commit_id;
        const url = <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
        return {
            badge: <EventBadge icon={GoComment} content="Commit Comment" color="#34495e"/>,
            header: <span>{actor} commented on {url} in {repo}</span>
        }
    }
    else if(event.type === "CreateEvent") {
        const isTag = (event.payload as any).ref_type === "tag";
        return {
            badge: <EventBadge icon={isTag ? GoTag : GoGitBranch} content={isTag ? "Create Tag" : "Create Branch"} color="#27ae60"/>,
            header: <span>{actor} created {ref} in {repo}</span>,
        }
    }
    else if(event.type === "DeleteEvent") {
        const isTag = (event.payload as any).ref_type === "tag";
        return {
            badge: <EventBadge icon={GoFlame} content={isTag ? "Delete Tag" : "Delete Branch"} color="#e74c3c"/>,
            header: <span>{actor} deleted {ref} in {repo}</span>,
        }
    }
    else if(event.type === "ForkEvent") {
        return {
            badge: <EventBadge icon={GoRepoForked} content="Fork" color="#8e44ad"/>,
            header: <span>{actor} forked {repo}</span>,
        }
    }
    else if(event.type === "PushEvent") {
        const commits = (event.payload as any).commits
        if(commits.length === 0) return null
        const commitId = commits[0].sha
        const commit = <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
        return {
            badge: <EventBadge icon={GoRepoPush} content="Push" color="#2980b9"/>,
            header: <span>{actor} pushed {commits > 0 ? commits.length + " commits" : commit} into {repo}</span>,
        }
    }
    else if(event.type === "WatchEvent") {
        return {
            badge: <EventBadge icon={GoStar} content="Star" color="#f39c12"/>,
            header: <span>{actor} starred {repo}</span>,
        }
    }
    else if(event.type === "GollumEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "IssueCommentEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "IssuesEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "MemberEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "PublicEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "PullRequestEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "PullRequestReviewEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "PullRequestReviewCommentEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "ReleaseEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "SponsorshipEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
}

function actorElement(event: EventType) {
    const actor = event.actor
    return <a className="main-url" href={actorURL(actor)}>{actor.display_login || actor.login}</a>
}

function repoElement(event: EventType) {
    const repo = event.repo;
    return <a href={"https://github.com/" + repo.name}>{repo.name}</a>
}