import { Endpoints } from "@octokit/types"
import { GoBook, GoComment, GoEye, GoGitBranch, GoGitMerge, GoGitPullRequest, GoIssueClosed, GoIssueOpened, GoIssueReopened, GoListUnordered, GoPerson, GoQuestion, GoRepo, GoRepoForked, GoRepoPush, GoStar, GoTag, GoTrashcan } from "react-icons/go"
import { actorURL } from "./actor"
import EventType from "./eventType";
import { IconType } from "react-icons";

type EndpointEventType = Endpoints["GET /events"]["response"]["data"][0];

enum EventColors {
    SUCCESS = "#27ae60",
    DANGER = "#c0392b",
    COMMENT = "#2c3e50",
    STAR = "#f1c40f",
    EDIT = "#f39c12",
    MERGE = "#9b59b6",
    INFO = "#2980b9",
    MISC = "#95a5a6"
}


export interface IEventInfo {
    header: JSX.Element,
    icon: IconType,
    color: string,
    type: EventType,
    event: EndpointEventType
}

export function eventInfo(event: EndpointEventType) : IEventInfo | null {
    const result = {
        event: event
    }
    const actor = actorElement(event)
    const repo = repoElement(event)
    const commonRef = commonRefElement(event)

    if(event.type === "CommitCommentEvent") {
        const commit = commitForCommentElement(event)
        return {
            ...result,
            type: EventType.COMMIT_COMMENT,
            icon: GoComment,
            color: EventColors.COMMENT,
            header: <span>{actor} commented on {commit} in {repo}</span>
        }
    }
    else if(event.type === "CreateEvent") {
        if((event.payload as any).ref_type === "tag") {
            return {
                ...result,
                type: EventType.CREATE_TAG,
                color: EventColors.SUCCESS,
                icon: GoTag,
                header: <span>{actor} created {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "branch") {
            return {
                ...result,
                type: EventType.CREATE_BRACH,
                color: EventColors.SUCCESS,
                icon: GoGitBranch,
                header: <span>{actor} created {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "repository") {
            return {
                ...result,
                type: EventType.CREATE_REPO,
                color: EventColors.SUCCESS,
                icon: GoRepo,
                header: <span>{actor} created new repository {repo}</span>,
            }
        }
    }
    else if(event.type === "DeleteEvent") {
        if((event.payload as any).ref_type === "tag") {
            return {
                ...result,
                type: EventType.DELETE_TAG,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "branch") {
            return {
                ...result,
                type: EventType.DELETE_BRACH,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {commonRef} in {repo}</span>,
            }
        }
        else if((event.payload as any).ref_type === "repository") {
            return {
                ...result,
                type: EventType.DELETE_REPO,
                color: EventColors.DANGER,
                icon: GoTrashcan,
                header: <span>{actor} deleted {repo}</span>,
            }
        }
    }
    else if(event.type === "ForkEvent") {
        const forkee = forkeeElement(event)
        return {
            ...result,
            type: EventType.FORK_REPO,
            color: EventColors.INFO,
            icon: GoRepoForked,
            header: <span>{actor} forked {forkee} from {repo}</span>,
        }
    }
    else if(event.type === "PushEvent") {
        const commit = commitElement(event)
        if (commit === null) return null
        return {
            ...result,
            type: EventType.PUSH,
            color: EventColors.MISC,
            icon: GoRepoPush,
            header: <span>{actor} pushed {commit} into {repo}</span>,
        }
    }
    else if(event.type === "WatchEvent") {
        if(event.payload.action === "started") {
            return {
                ...result,
                type: EventType.STAR_REPO,
                color: EventColors.STAR,
                icon: GoStar,
                header: <span>{actor} starred {repo}</span>,
            }
        }
    }
    else if(event.type === "IssueCommentEvent") {
        const issue = issueElement(event)
        if(event.payload.issue?.pull_request !== undefined) {
            if(event.payload.action === "created") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.COMMENT,
                    icon: GoComment,
                    header: <span>{actor} commented on pull request {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "deleted") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.DANGER,
                    icon: GoComment,
                    header: <span>{actor} deleted comment on pull request {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "edited") {
                return {
                    ...result,
                    type: EventType.PR_COMMENT,
                    color: EventColors.EDIT,
                    icon: GoComment,
                    header: <span>{actor} edited comment on pull request {issue} in {repo}</span>
                }
            }
        }
        else {
            if(event.payload.action === "created") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.COMMENT,
                    icon: GoComment,
                    header: <span>{actor} commented on issue {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "deleted") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.DANGER,
                    icon: GoComment,
                    header: <span>{actor} deleted comment on issue {issue} in {repo}</span>
                }
            }
            else if(event.payload.action === "edited") {
                return {
                    ...result,
                    type: EventType.ISSUE_COMMENT,
                    color: EventColors.EDIT,
                    icon: GoComment,
                    header: <span>{actor} edited comment on issue {issue} in {repo}</span>
                }
            }
        }
    }
    else if(event.type === "IssuesEvent") {
        const issue = issueElement(event)
        if(event.payload.action === "opened") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.SUCCESS,
                icon: GoIssueOpened,
                header: <span>{actor} opened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.SUCCESS,
                icon: GoIssueReopened,
                header: <span>{actor} reopened issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "closed") {
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.MERGE,
                icon: GoIssueClosed,
                header: <span>{actor} closed issue {issue} in {repo}</span>
            }
        }
        else if(event.payload.action === "assigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} assigned {assignee} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unassigned") {
            const assignee = <a href={event.payload.issue?.assignee?.html_url}>{event.payload.issue?.assignee?.login}</a>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} unassigned {assignee} from issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "labeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoTag,
                header: <span>{actor} added label {label} to issue {issue} in {repo}</span>,
            }
        }
        else if(event.payload.action === "unlabeled") {
            const label = <code>{(event.payload as any).label.name}</code>
            return {
                ...result,
                type: EventType.ISSUE,
                color: EventColors.EDIT,
                icon: GoTag,
                header: <span>{actor} removed label {label} to issue {issue} in {repo}</span>,
            }
        }
    }
    else if(event.type === "PullRequestReviewEvent") {
        const pullRequest = pullRequestElement(event)
        if(event.payload.action === "created") {
            return {
                ...result,
                type: EventType.PR_REVIEW,
                color: EventColors.INFO,
                icon: GoEye,
                header: <span>{actor} reviewed {pullRequest} in {repo}</span>
            }
        }
    }
    else if(event.type === "PullRequestReviewCommentEvent") {
        const pullRequest = pullRequestElement(event)
        if(event.payload.action === "created") {
            return {
                ...result,
                type: EventType.PR_REVIEW_COMMENT,
                color: EventColors.COMMENT,
                icon: GoComment,
                header: <span>{actor} commented on review of {pullRequest} in {repo}</span>
            }
        }
    }
    else if(event.type === "PublicEvent") {
        return {
            ...result,
            type: EventType.PUBLIC,
            color: EventColors.SUCCESS,
            icon: GoRepo,
            header: <span>{actor} published new repository {repo}</span>,
        }
    }
    else if(event.type === "PullRequestEvent") {
        const pullRequest = pullRequestElement(event)
        if(event.payload.action === "opened") {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.SUCCESS,
                icon: GoGitPullRequest,
                header: <span>{actor} opened pull request {pullRequest} in {repo}</span>,
            }
        }
        else if(event.payload.action === "reopened") {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.SUCCESS,
                icon: GoGitPullRequest,
                header: <span>{actor} reopened pull request {pullRequest} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && (event.payload as any).pull_request.merged) {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.MERGE,
                icon: GoGitMerge,
                header: <span>{actor} merged pull request {pullRequest} in {repo}</span>,
            }
        }
        else if(event.payload.action === "closed" && !(event.payload as any).pull_request.merged) {
            return {
                ...result,
                type: EventType.PR,
                color: EventColors.DANGER,
                icon: GoGitPullRequest,
                header: <span>{actor} closed pull request {pullRequest} in {repo}</span>,
            }
        }
    }
    else if(event.type === "ReleaseEvent") {
        const release = releaseElement(event)
        if(event.payload.action === "published") {
            return {
                ...result,
                type: EventType.RELEASE,
                color: EventColors.INFO,
                icon: GoListUnordered,
                header: <span>{actor} published {release} (release) in {repo}</span>,
            }
        }
    }
    else if(event.type === "MemberEvent") {
        const member = memberElement(event)
        if(event.payload.action === "added") {
            return {
                ...result,
                type: EventType.COLLABORATOR_ADD,
                color: EventColors.EDIT,
                icon: GoPerson,
                header: <span>{actor} added {member} as collaborator to {repo}</span>,
            }
        }
    }
    else if(event.type === "GollumEvent") {
        return {
            ...result,
            type: EventType.WIKI_EDIT,
            color: EventColors.EDIT,
            icon: GoBook,
            header: <span>{actor} updated wiki for {repo}</span>,
        }
    }
    return {
        ...result,
        type: EventType.OTHER,
        color: EventColors.DANGER,
        icon: GoQuestion,
        header: (
            <span style={{color: EventColors.DANGER, fontWeight: 600}}>
                This event could not be loaded!<br />
                <code>{JSON.stringify(event)}</code>
            </span>
        ),
    }
}

function actorElement(event: EndpointEventType) {
    const actor = event.actor
    return <a className="font-weight-bold" href={actorURL(actor)}>{actor.display_login || actor.login}</a>
}

function repoElement(event: EndpointEventType) {
    const repo = event.repo;
    return <a href={"https://github.com/" + repo.name}>{repo.name}</a>
}

function commonRefElement(event: EndpointEventType) {
    return <span><code>{(event.payload as any).ref}</code> ({(event.payload as any).ref_type})</span>
}

function memberElement(event: EndpointEventType) {
    const member = (event.payload as any).member;
    return <a href={member.html_url}>{member.login}</a>
}

function releaseElement(event: EndpointEventType) {
    const release = (event.payload as any).release;
    const name = release.name && release.name.length > 0 ? release.name : release.tag
    return <a href={release.html_url}><code>{name}</code></a>
}

function pullRequestElement(event: EndpointEventType) {
    const pullRequest = (event.payload as any).pull_request
    return <a href={pullRequest.html_url} className="font-weight-bold">#{pullRequest.number}</a>
}

function issueElement(event: EndpointEventType) {
    const issue = event.payload.issue
    return <a href={issue?.html_url} className="font-weight-bold">#{issue?.number}</a>
}

function commitElement(event: EndpointEventType) {
    const commits = (event.payload as any).commits
    if(commits.length === 0) {
        return null
    }
    else if(commits.length === 1) {
        const commitId = commits[0].sha
        return <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
    }
    else {
        return <span><code>{commits.length}</code> commits</span>
    }   
}

function commitForCommentElement(event: EndpointEventType) {
    const commitId = (event.payload.comment as any).commit_id;
    return <a href={`https://github.com/${event.repo.name}/commit/${commitId}`}><code>{commitId.substr(0, 8)}</code></a>
}

function forkeeElement(event: EndpointEventType) {
    const forkee = (event.payload as any).forkee
    return <a href={forkee.html_url}>{forkee.full_name}</a>

}
