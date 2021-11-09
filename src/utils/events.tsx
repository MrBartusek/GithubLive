import { Endpoints } from "@octokit/types"
import EventBadge from "../EventBadge/EventBadge"
import { GoComment, GoEye, GoGitBranch, GoGitMerge, GoGitPullRequest, GoHeart, GoIssueClosed, GoIssueOpened, GoIssueReopened, GoPerson, GoRepoForked, GoRepoPush, GoStar, GoTag, GoTrashcan, GoUnverified } from "react-icons/go"
import { actorURL } from "./actor"

interface IEventInfo {
    header: JSX.Element,
    badge: JSX.Element
}

type EventType = Endpoints["GET /events"]["response"]["data"][0];

export default function eventInfo(event: EventType) : IEventInfo | null {
    const actor = actorElement(event)
    const repo = repoElement(event)
    const ref = <span><code>{(event.payload as any).ref}</code> ({(event.payload as any).ref_type})</span>

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
            badge: <EventBadge icon={GoTrashcan} content={isTag ? "Delete Tag" : "Delete Branch"} color="#e74c3c"/>,
            header: <span>{actor} deleted {ref} in {repo}</span>,
        }
    }
    else if(event.type === "ForkEvent") {
        return {
            badge: <EventBadge icon={GoRepoForked} content="Fork" color="#9b59b6"/>,
            header: <span>{actor} forked {repo}</span>,
        }
    }
    else if(event.type === "PushEvent") {
        const commits = (event.payload as any).commits
        if(commits.length === 0) return null
        const commitId = commits[0].sha
        const commit = <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
        return {
            badge: <EventBadge icon={GoRepoPush} content="Push" color="#7f8c8d"/>,
            header: <span>{actor} pushed {commits > 0 ? commits.length + " commits" : commit} into {repo}</span>,
        }
    }
    else if(event.type === "WatchEvent") {
        if(event.payload.action === "started") {
            return {
                badge: <EventBadge icon={GoStar} content="Star" color="#f39c12"/>,
                header: <span>{actor} starred {repo}</span>,
            }
        }
    }
    else if(event.type === "IssueCommentEvent") {
        const issue = <a href={event.payload.issue?.html_url} className="font-weight-bold">#{event.payload.issue?.number}</a>
        if(event.payload.action === "created") {
            return {
                badge: <EventBadge icon={GoComment} content="Issue Comment" color="#34495e"/>,
                header: <span>{actor} commented on issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "deleted") {
            return {
                badge: <EventBadge icon={GoComment} content="Issue Comment" color="#e74c3c"/>,
                header: <span>{actor} deleted comment on issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "edited") {
            return {
                badge: <EventBadge icon={GoComment} content="Issue Comment" color="#e67e22"/>,
                header: <span>{actor} edited comment on issue {issue} in {repo}</span>
            }
        }
    }
    else if(event.type === "IssuesEvent") {
        const issue = <a href={event.payload.issue?.html_url} className="font-weight-bold">#{event.payload.issue?.number}</a>
        if(event.payload.action === "opened") {
            return {
                badge: <EventBadge icon={GoIssueOpened} content="Issue" color="#27ae60"/>,
                header: <span>{actor} opened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                badge: <EventBadge icon={GoIssueReopened} content="Issue" color="#27ae60"/>,
                header: <span>{actor} reopened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "closed") {
            return {
                badge: <EventBadge icon={GoIssueClosed} content="Issue" color="#e74c3c"/>,
                header: <span>{actor} closed issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "assigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                badge: <EventBadge icon={GoPerson} content="Issue" color="#e67e22"/>,
                header: <span>{actor} assigned {assignee} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unassigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                badge: <EventBadge icon={GoPerson} content="Issue" color="#e67e22"/>,
                header: <span>{actor} unassigned {assignee} from issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "labeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                badge: <EventBadge icon={GoTag} content="Issue" color="#e67e22"/>,
                header: <span>{actor} added label {label} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unlabeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                badge: <EventBadge icon={GoTag} content="Issue" color="#e67e22"/>,
                header: <span>{actor} REMOVED label {label} to issue {issue} in {repo}</span>,
            }
        }
    }
    else if(event.type === "MemberEvent") {
        return {
            badge: <EventBadge icon={GoUnverified} content={event.type || ""}/>,
            header: <span></span>,
        }
    }
    else if(event.type === "PullRequestReviewEvent") {
        const pr = (event.payload as any).pull_request
        const url = <a href={pr.html_url}className="font-weight-bold">#{pr.number}</a>
        if(event.payload.action === "created") {
            return {
                badge: <EventBadge icon={GoEye} content="Pull Request Review" color="#2980b9"/>,
                header: <span>{actor} reviewed {url} in {repo}</span>
            }
        }
    }
    else if(event.type === "PullRequestReviewCommentEvent") {
        const pr = (event.payload as any).pull_request
        const url = <a href={pr.html_url}className="font-weight-bold">#{pr.number}</a>
        if(event.payload.action === "created") {
            return {
                badge: <EventBadge icon={GoComment} content="Pull Request Review Comment" color="#34495e"/>,
                header: <span>{actor} commented on review of {url} in {repo}</span>
            }
        }
    }
    else if(event.type === "PublicEvent") {
        return {
            badge: <EventBadge icon={GoHeart} content="Public" color="#9b59b6"/>,
            header: <span>{actor} published new repository {repo}</span>,
        }
    }
    else if(event.type === "PullRequestEvent") {
        const pullRequest = (event.payload as any).pull_request
        const url = <a href={pullRequest.html_url} className="font-weight-bold">#{pullRequest.number}</a>
        if(event.payload.action === "opened") {
            return {
                badge: <EventBadge icon={GoGitPullRequest} content="Pull Request" color="#27ae60" />,
                header: <span>{actor} opened pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                badge: <EventBadge icon={GoGitPullRequest} content="Pull Request" color="#27ae60" />,
                header: <span>{actor} reopened pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && pullRequest.merged) {
            return {
                badge: <EventBadge icon={GoGitMerge} content="Pull Request" color="#9b59b6" />,
                header: <span>{actor} merged pull request {url} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && !pullRequest.merged) {
            return {
                badge: <EventBadge icon={GoGitPullRequest} content="Pull Request" color="#e74c3c" />,
                header: <span>{actor} closed pull request {url} in {repo}</span>,
            }
        }
    }
    else if(event.type === "ReleaseEvent") {
        const release = (event.payload as any).release;
        const name = release.name && release.name.length > 0 ? release.name : release.tag
        const url = <a href={release.html_url}><code>{name}</code></a>
        if(event.payload.action === "published") {
            return {
                badge: <EventBadge icon={GoTag} content="Release" color="#27ae60" />,
                header: <span>{actor} published {url} (release) in {repo}</span>,
            }
        }
    }
    return {
        badge: <EventBadge icon={GoUnverified} content={event.type || ""} color="#c0392b"/>,
        header: <span style={{color: "#c0392b", fontWeight: 600}}>This event could not be loaded!</span>,
    }
}

function actorElement(event: EventType) {
    const actor = event.actor
    return <a className="font-weight-bold" href={actorURL(actor)}>{actor.display_login || actor.login}</a>
}

function repoElement(event: EventType) {
    const repo = event.repo;
    return <a href={"https://github.com/" + repo.name}>{repo.name}</a>
}