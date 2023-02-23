import { createID } from "@/utils/createID";
import store from "@/store";
import { DIR_NAME } from "@/firebase/constants";
const { storage, firestore } = store.state;

import {
	deleteDoc,
	setDoc,
	doc,
	collection,
	getDoc,
	getDocs,
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

async function uploadPreview(preview, id) {
	const path = `${id}/${preview.name}`;
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, preview);
	return await getDownloadURL(storageRef);
}

export async function uploadPost(uid, title, body, preview) {
	// const lastId = getLastPostId();
	const id = createID(); //String(lastId + 1);
	const previewURL = await uploadPreview(preview, id);
	const newPost = {
		id,
		uid,
		title,
		body,
		previewName: preview.name,
		previewURL,
	};
	const docRef = doc(collection(firestore, DIR_NAME), id);
	return await setDoc(docRef, newPost, { merge: true });
}

///////////////////////////////////////////////////////////////////////////
// DOWNLOAD
///////////////////////////////////////////////////////////////////////////

// async function getLastPostId() {
// 	const queryPosts = await getQueryPosts();
// 	return queryPosts.size;
// }

async function getQueryPosts() {
	const postsCollection = collection(firestore, DIR_NAME);
	return getDocs(postsCollection);
}

export async function downloadAllPosts() {
	const queryPosts = await getQueryPosts();
	const result = [];
	if (queryPosts.empty) return result;
	queryPosts.forEach(async (post) => {
		const data = post.data();
		result.push(data);
	});
	return result;
}

export async function downloadPost(id) {
	const postRef = doc(firestore, DIR_NAME, id);
	const postSnap = await getDoc(postRef);
	if (postSnap.exists()) {
		return postSnap.data();
	} else {
		throw new Error("no such doc!");
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
	await deleteDoc(doc(firestore, DIR_NAME, id));
}
