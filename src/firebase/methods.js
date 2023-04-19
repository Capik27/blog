import { createID } from "@/utils/createID";
import datasort from "@/utils/datasort";
import store from "@/store";
import { PATH_COMMENTS, PATH_POSTS, PATH_LIKES } from "@/firebase/constants";
const { storage, firestore, auth } = store.state;

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

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
	signOut,
} from "firebase/auth";

///////////////////////////////////////////////////////////////////////////
// LOGIN  /  LOGOUT
///////////////////////////////////////////////////////////////////////////
export async function logoutAcc(a = auth) {
	return signOut(a);
}

export async function loginGoogle() {
	const provider = new GoogleAuthProvider();
	const userData = await signInWithPopup(auth, provider);
	GoogleAuthProvider.credentialFromResult(userData);
	return userData;
}

export function loginDefault(email, pass) {
	return signInWithEmailAndPassword(auth, email, pass);
}

///////////////////////////////////////////////////////////////////////////
// REGISTER
///////////////////////////////////////////////////////////////////////////

export async function registerAuth(name, email, pass) {
	const auth = getAuth();
	await createUserWithEmailAndPassword(auth, email, pass);
	await updateProfile(auth.currentUser, {
		displayName: name,
	});
	signOut(auth);

	return loginDefault(email, pass);
}

///////////////////////////////////////////////////////////////////////////
// CHANGE
///////////////////////////////////////////////////////////////////////////

export async function changePost(post, title, body, preview) {
	let previewURL = post.previewURL;
	if (typeof preview != "string") {
		await deletePostPreview(`${post.id}/${post.previewName}`);
		previewURL = await uploadPreview(preview, post.id);
	}

	const changedPost = {
		...post,
		title,
		body,
		previewURL,
		previewName: preview.name || post.previewName,
		changedAt: serverTimestamp(),
	};
	const docRef = doc(collection(firestore, PATH_POSTS), post.id);
	return await setDoc(docRef, changedPost, { merge: true });
}

///////////////////////////////////////////////////////////////////////////
// UPLOAD
///////////////////////////////////////////////////////////////////////////

export async function uploadPost(uid, author, title, body, preview) {
	const id = createID();
	const previewURL = await uploadPreview(preview, id);
	const newPost = {
		id,
		uid,
		author,
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

export async function uploadLike(postId, uid) {
	const id = createID();
	const newLike = {
		id,
		uid,
		createdAt: serverTimestamp(),
	};
	const db = {
		[uid]: newLike,
	};
	const docRef = doc(collection(firestore, PATH_LIKES), postId);
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

/////////////// PRIVATE

async function downloadDocs(path) {
	const docCollection = collection(firestore, path);
	const queryDocs = await getDocs(docCollection);
	const result = [];
	if (queryDocs.empty) return result;
	queryDocs.forEach(async (doc) => {
		const data = doc.data();
		result.push(data);
	});
	return result;
}

async function downloadLikesObj(path) {
	const docCollection = collection(firestore, path);
	const queryDocs = await getDocs(docCollection);
	const result = {};
	if (queryDocs.empty) return result;
	queryDocs.forEach(async (doc) => {
		const data = doc.data();
		result[doc.id] = data;
	});
	return result;
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

/////////////// PUBLIC

// comments

export async function downloadComments(id) {
	const comments = await downloadDoc(id, PATH_COMMENTS);
	const result = [];
	for (const key in comments) {
		result.push(comments[key]);
	}
	result.sort(datasort);
	return result;
}

// likes

export function downloadLikesBase() {
	return downloadLikesObj(PATH_LIKES);
}

export async function downloadLikes(id) {
	const likes = await downloadDoc(id, PATH_LIKES);
	const result = {};
	for (const key in likes) {
		result[key] = likes[key];
	}
	return result;
}

// posts

export function downloadPosts() {
	return downloadDocs(PATH_POSTS);
}
export function downloadPost(id) {
	return downloadDoc(id, PATH_POSTS);
}

///////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////

/////////////// PRIVATE

async function deletePostPreview(path) {
	const previewRef = ref(storage, path);
	await deleteObject(previewRef);
}

/////////////// PUBLIC

// post
export async function deletePost(id, previewName) {
	await deletePostPreview(`${id}/${previewName}`);
	await deleteDoc(doc(firestore, PATH_POSTS, id));
	await deleteDoc(doc(firestore, PATH_COMMENTS, id));
	await deleteDoc(doc(firestore, PATH_LIKES, id));
}

// comment

export async function deleteComment(id, postId) {
	const docRef = doc(firestore, PATH_COMMENTS, postId);
	const db = {
		[id]: deleteField(),
	};
	return setDoc(docRef, db, { merge: true });
}

// like

export async function deleteLike(uid, postId) {
	const docRef = doc(firestore, PATH_LIKES, postId);
	const db = {
		[uid]: deleteField(),
	};
	return setDoc(docRef, db, { merge: true });
}
