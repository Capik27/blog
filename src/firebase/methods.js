import { createID } from "@/utils/createID";
import datasort from "@/utils/datasort";
import store from "@/store";
import { PATH_COMMENTS, PATH_POSTS } from "@/firebase/constants";
const { storage, firestore } = store.state;

import {
	serverTimestamp,
	deleteDoc,
	setDoc,
	doc,
	collection,
	getDoc,
	getDocs,
	deleteField,
} from "firebase/firestore";

import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";

//deleteDoc, query, orderBy getDownloadURL
//deleteObject, listAll

///////////////////////////////////////////////////////////////////////////
// UPLOAD
///////////////////////////////////////////////////////////////////////////

export async function uploadPost(uid, title, body, preview) {
	// const lastId = getLastPostId();
	const id = createID(); //String(lastId + 1);
	const previewURL = await uploadPreview(preview, id);
	const newPost = {
		id,
		uid,
		title,
		body,
		previewURL,
		previewName: preview.name,
		createdAt: serverTimestamp(),
	};
	const docRef = doc(collection(firestore, PATH_POSTS), id);
	return await setDoc(docRef, newPost, { merge: true });
}

export async function uploadComment(postId, uid, name, value) {
	const id = createID();
	const newComment = {
		id,
		uid,
		name,
		value,
		createdAt: serverTimestamp(),
	};
	const db = {
		[id]: newComment,
	};
	const docRef = doc(collection(firestore, PATH_COMMENTS), postId);
	return setDoc(docRef, db, { merge: true });
}

async function uploadPreview(preview, id) {
	const path = `${id}/${preview.name}`;
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, preview);
	return await getDownloadURL(storageRef);
}

///////////////////////////////////////////////////////////////////////////
// DOWNLOAD
///////////////////////////////////////////////////////////////////////////

// async function getLastPostId() {
// 	const queryPosts = await getQueryPosts();
// 	return queryPosts.size;
// }

export function downloadPosts() {
	return downloadDocs(PATH_POSTS);
}

async function downloadDocs(path) {
	const docCollection = collection(firestore, path);
	const queryDocs = await getDocs(docCollection);
	const result = [];
	if (queryDocs.empty) return result;
	queryDocs.forEach(async (post) => {
		const data = post.data();
		result.push(data);
	});
	return result;
}
/////////////////////////////////////
export async function downloadComments(id) {
	const comments = await downloadDoc(id, PATH_COMMENTS);
	const result = [];
	for (const key in comments) {
		result.push(comments[key]);
	}
	result.sort(datasort);
	return result;
}
export function downloadPost(id) {
	return downloadDoc(id, PATH_POSTS);
}
async function downloadDoc(id, path) {
	const docRef = doc(firestore, path, id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return [];
		// throw new Error("no such doc!");
	}
}

///////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////

async function deletePostPreview(path) {
	const previewRef = ref(storage, path);
	await deleteObject(previewRef);
}

export async function deletePost(id, previewName) {
	await deletePostPreview(`${id}/${previewName}`);
	await deleteDoc(doc(firestore, PATH_POSTS, id));
	await deleteDoc(doc(firestore, PATH_COMMENTS, id));
}

export async function deleteComment(id, postId) {
	const docRef = doc(firestore, PATH_COMMENTS, postId);
	const db = {
		[id]: deleteField(),
	};
	setDoc(docRef, db, { merge: true });
}
