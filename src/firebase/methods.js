import { createID } from "@/utils/createID";
import { setDoc, doc, collection, getDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//deleteDoc, query, orderBy getDownloadURL
//deleteObject, listAll
import store from "@/store";
const { storage, firestore } = store.state;

async function uploadPreview(preview, id) {
	const path = `${id}/${preview.name}`;
	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, preview);

	return await getDownloadURL(storageRef);
}

export async function uploadPost(uid, title, body, preview) {
	const id = createID();
	const previewURL = await uploadPreview(preview, id);
	const newPost = {
		id,
		uid,
		title,
		body,
		previewURL,
	};

	const docRef = doc(collection(firestore, "posts"), id);

	return await setDoc(docRef, newPost, { merge: true });
}

export async function downloadAllPosts() {
	const postsCollection = collection(firestore, "posts");
	const queryPosts = await getDocs(postsCollection);
	const result = [];
	if (queryPosts.empty) return result;
	queryPosts.forEach(async (post) => {
		const data = post.data();
		result.push(data);
	});
	return result;
}

export async function downloadPost(id) {
	const postRef = doc(firestore, "posts", id);
	const postSnap = await getDoc(postRef);

	if (postSnap.exists()) {
		return postSnap.data();
		// console.log("Document data:", postSnap.data());
	} else {
		console.log("No such document!");
	}
}
